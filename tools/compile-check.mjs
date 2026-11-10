/* ════════════════════════════════════════════════════════════
   67coder — проверка кода в главах.

   Компилирует и запускает каждую программу из опубликованных
   глав и черновиков ТЕМ ЖЕ компилятором, что у студентов в
   браузере: Clang под WebAssembly, 32 бита, без исключений.
   Поэтому если здесь вывод совпал с expected — у студента он
   совпадёт тоже.

   Что проверяется:
     predict   код → вывод должен совпасть с expected
     editor    решение (или код-образец над редактором) → expected;
               фрагменты из requires должны быть в решении
     example   код компилируется и запускается
     parsons   собранная в правильном порядке программа компилируется
     blanks    программа с правильными ответами компилируется
   Шаг с "compiles": false пропускается — для намеренно сломанных
   примеров.

   На GitHub запускается при каждой публикации. Руками, если есть
   Node.js:
     npm install --prefix ../clang @yowasp/clang@22.0.0-git20542-10
     CLANG_DIR=../clang node tools/compile-check.mjs
   ════════════════════════════════════════════════════════════ */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

const CXX_FLAGS = ["-std=c++20", "--target=wasm32-wasip1", "-fno-exceptions", "-O1"];
const RUN_TIMEOUT_MS = 8000;

/* ── WASI — ровно как в runner.worker.js на сайте ─────────── */
const ERRNO = { SUCCESS: 0, BADF: 8, INVAL: 28, NOSYS: 52, SPIPE: 70 };
function makeWasi(stdinText, onOut, onErr) {
  let mem = null;
  const stdin = new TextEncoder().encode(stdinText || "");
  let stdinPos = 0;
  const view = () => new DataView(mem.buffer);
  const bytes = () => new Uint8Array(mem.buffer);
  class ExitSignal extends Error { constructor(code) { super("exit"); this.code = code; } }
  const impl = {
    proc_exit(code) { throw new ExitSignal(code); },
    fd_close() { return ERRNO.SUCCESS; },
    fd_seek() { return ERRNO.SPIPE; },
    fd_prestat_get() { return ERRNO.BADF; },
    fd_prestat_dir_name() { return ERRNO.INVAL; },
    environ_get() { return ERRNO.SUCCESS; },
    args_get() { return ERRNO.SUCCESS; },
    sched_yield() { return ERRNO.SUCCESS; },
    poll_oneoff() { return ERRNO.NOSYS; },
    environ_sizes_get(c, s) { const d = view(); d.setUint32(c, 0, true); d.setUint32(s, 0, true); return ERRNO.SUCCESS; },
    args_sizes_get(c, s) { const d = view(); d.setUint32(c, 0, true); d.setUint32(s, 0, true); return ERRNO.SUCCESS; },
    clock_time_get(id, p, out) { view().setBigUint64(out, BigInt(Date.now()) * 1000000n, true); return ERRNO.SUCCESS; },
    clock_res_get(id, out) { view().setBigUint64(out, 1000000n, true); return ERRNO.SUCCESS; },
    random_get(ptr, len) { crypto.getRandomValues(bytes().subarray(ptr, ptr + len)); return ERRNO.SUCCESS; },
    fd_fdstat_get(fd, out) {
      const d = view(); d.setUint8(out, 2); d.setUint16(out + 2, 0, true);
      d.setBigUint64(out + 8, 0xffffffffffffffffn, true); d.setBigUint64(out + 16, 0xffffffffffffffffn, true);
      return ERRNO.SUCCESS;
    },
    fd_write(fd, iovs, n, written) {
      const d = view(), b = bytes(); let total = 0; const parts = [];
      for (let i = 0; i < n; i++) {
        const ptr = d.getUint32(iovs + i * 8, true), len = d.getUint32(iovs + i * 8 + 4, true);
        parts.push(b.slice(ptr, ptr + len)); total += len;
      }
      const all = new Uint8Array(total); let off = 0;
      for (const p of parts) { all.set(p, off); off += p.length; }
      (fd === 2 ? onErr : onOut)(all); d.setUint32(written, total, true); return ERRNO.SUCCESS;
    },
    fd_read(fd, iovs, n, nread) {
      const d = view(), b = bytes(); let got = 0;
      for (let i = 0; i < n && stdinPos < stdin.length; i++) {
        const ptr = d.getUint32(iovs + i * 8, true), len = d.getUint32(iovs + i * 8 + 4, true);
        const take = Math.min(len, stdin.length - stdinPos);
        b.set(stdin.subarray(stdinPos, stdinPos + take), ptr); stdinPos += take; got += take;
      }
      d.setUint32(nread, got, true); return ERRNO.SUCCESS;
    }
  };
  return {
    ExitSignal,
    setMemory(m) { mem = m; },
    importObject(module) {
      const obj = {};
      for (const imp of WebAssembly.Module.imports(module)) {
        obj[imp.module] = obj[imp.module] || {};
        obj[imp.module][imp.name] = impl[imp.name] || (() => ERRNO.NOSYS);
      }
      return obj;
    }
  };
}

/* ── запуск собранной программы — в отдельном потоке, чтобы
      бесконечный цикл не повесил проверку ─────────────────── */
if (!isMainThread) {
  const { binary, stdin } = workerData;
  const dec = new TextDecoder();
  let out = "", err = "";
  const wasi = makeWasi(stdin, (b) => { out += dec.decode(b); }, (b) => { err += dec.decode(b); });
  const module = await WebAssembly.compile(binary);
  const instance = await WebAssembly.instantiate(module, wasi.importObject(module));
  wasi.setMemory(instance.exports.memory);
  let exitCode = 0;
  try { instance.exports._start(); }
  catch (e) { if (e instanceof wasi.ExitSignal) exitCode = e.code; else { err += String(e?.message || e); exitCode = 1; } }
  parentPort.postMessage({ stdout: out, stderr: err, exitCode });
} else {
  await main();
}

function runBinary(binary, stdin) {
  return new Promise((resolve) => {
    const w = new Worker(new URL(import.meta.url), { workerData: { binary, stdin } });
    const timer = setTimeout(() => { w.terminate(); resolve({ timeout: true }); }, RUN_TIMEOUT_MS);
    w.once("message", (m) => { clearTimeout(timer); w.terminate(); resolve(m); });
    w.once("error", (e) => { clearTimeout(timer); resolve({ stdout: "", stderr: String(e?.message || e), exitCode: 1 }); });
  });
}

async function loadClang() {
  const base = process.env.CLANG_DIR ? path.resolve(process.env.CLANG_DIR) : process.cwd();
  const pkgDir = path.join(base, "node_modules", "@yowasp", "clang");
  const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
  const entry = typeof pkg.exports === "string" ? pkg.exports : pkg.exports.default || pkg.exports.import;
  return (await import(pathToFileURL(path.join(pkgDir, entry)).href)).commands;
}

async function main() {
  const CONTENT = path.join(process.cwd(), "content");
  const errors = [], warnings = [];
  const pad2 = (n) => (n < 10 ? "0" : "") + n;
  const sv = (step, tx, f) => (tx && tx[f] !== undefined ? tx[f] : step[f]);
  const norm = (s) => String(s ?? "").replace(/\r/g, "").replace(/[ \t]+$/gm, "").replace(/\s+$/, "");
  const short = (s) => { const t = norm(s); return t.length > 160 ? t.slice(0, 160) + "…" : t; };

  /* собираем все программы, одинаковые проверяем один раз */
  const jobs = new Map();
  const add = (where, kind, code, stdin, expected) => {
    const key = JSON.stringify([code, stdin, expected]);
    if (!jobs.has(key)) jobs.set(key, { where: [], kind, code, stdin, expected });
    jobs.get(key).where.push(where);
  };

  const courses = JSON.parse(fs.readFileSync(path.join(CONTENT, "courses.json"), "utf8")).courses || [];
  for (const c of courses.filter((x) => x.status === "live")) {
    const dir = path.join(CONTENT, c.id);
    const struct = JSON.parse(fs.readFileSync(path.join(dir, "course.json"), "utf8"));
    for (const l of (struct.modules || []).flatMap((m) => m.lessons || [])) {
      const langs = [...new Set([...(l.locales || []), ...(l.draft || [])])];
      if (!langs.length) continue;
      const sFile = path.join(dir, `lesson-${pad2(l.n)}.json`);
      if (!fs.existsSync(sFile)) continue;
      const data = JSON.parse(fs.readFileSync(sFile, "utf8"));
      for (const lang of langs) {
        const tFile = path.join(dir, `lesson-${pad2(l.n)}.${lang}.json`);
        const texts = fs.existsSync(tFile) ? JSON.parse(fs.readFileSync(tFile, "utf8")) : {};
        for (const step of data.steps || []) {
          if (step.compiles === false) continue;
          const tx = (texts.steps || {})[step.id] || {};
          const where = `${c.id}/глава ${l.n}, шаг ${step.id}`;
          const stdin = typeof step.stdin === "string" ? step.stdin : "";
          if (step.kind === "predict") add(where, "match", sv(step, tx, "code"), stdin, sv(step, tx, "expected"));
          if (step.kind === "editor") {
            const sol = sv(step, tx, "solution"), shown = sv(step, tx, "code"), exp = sv(step, tx, "expected");
            const prog = sol || shown;
            if (prog) add(where, exp !== undefined ? "match" : "compile", prog, stdin, exp);
            for (const r of step.requires || []) {
              if (sol && !sol.includes(r)) errors.push(`${where}: в решении нет обязательного «${r}» из requires`);
            }
          }
          if (step.kind === "example" && sv(step, tx, "code")) add(where, "compile", sv(step, tx, "code"), "", undefined);
          if (step.kind === "parsons") add(where, "compile", (sv(step, tx, "lines") || []).join("\n"), "", undefined);
          if (step.kind === "blanks") {
            const answers = sv(step, tx, "blanks") || {};
            const filled = String(sv(step, tx, "code") || "").replace(/\[\[(\w+)\]\]/g, (_, k) => {
              const a = answers[k]; return Array.isArray(a) ? a[0] : a ?? "";
            });
            add(where, "compile", filled, "", undefined);
          }
        }
      }
    }
  }

  if (!jobs.size) { console.log("Программ для проверки нет."); return; }
  console.log(`Программ к проверке: ${jobs.size}. Загружаю компилятор сайта…`);
  const clang = await loadClang();
  const dec = new TextDecoder();

  for (const job of jobs.values()) {
    const where = [...new Set(job.where)].join("; ");
    let diag = "", binary = null;
    try {
      const tree = await clang["clang++"]([...CXX_FLAGS, "main.cpp", "-o", "a.out"], { "main.cpp": job.code },
        { stderr: (b) => { if (b) diag += dec.decode(b); }, decodeASCII: false });
      binary = tree && tree["a.out"];
    } catch (e) { /* ошибка компиляции — ниже */ }
    if (!binary) {
      const first = diag.split("\n").find((x) => /error/.test(x)) || diag.split("\n")[0] || "";
      errors.push(`${where}: не компилируется — ${first.trim()}`);
      continue;
    }
    const r = await runBinary(binary, job.stdin);
    if (r.timeout) { errors.push(`${where}: программа не завершилась за ${RUN_TIMEOUT_MS / 1000} с — бесконечный цикл?`); continue; }
    if (r.exitCode !== 0) { errors.push(`${where}: программа завершилась с кодом ${r.exitCode}${r.stderr ? " — " + short(r.stderr) : ""}`); continue; }
    if (job.kind === "match" && norm(r.stdout) !== norm(job.expected)) {
      errors.push(`${where}: вывод не совпадает с expected\n      ожидалось: ${JSON.stringify(short(job.expected))}\n      на деле:   ${JSON.stringify(short(r.stdout))}`);
    }
  }

  errors.splice(0, errors.length, ...new Set(errors));
  if (warnings.length) console.log(`Предупреждения:\n  ${warnings.join("\n  ")}\n`);
  if (errors.length) {
    console.log(`ОШИБКИ В КОДЕ (${errors.length}) — публикация остановлена:\n  ${errors.join("\n  ")}`);
    process.exit(1);
  }
  console.log(`Код в главах проверен: ${jobs.size} программ собраны и запущены компилятором сайта, вывод совпадает.`);
}
