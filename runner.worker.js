/* ════════════════════════════════════════════════════════════
   67coder — запуск кода студента.

   Всё происходит в браузере: ни сервера, ни ключей, ни лимитов.
   Clang/LLVM, собранный под WebAssembly, приезжает с CDN при
   первом запуске и дальше лежит в кеше браузера.

   Этот файл работает в Web Worker, поэтому страница не замирает,
   а бесконечный цикл студента убивается вместе с воркером.

   Сообщения наружу:
     { id, type: "status", text }        ход дела
     { id, type: "done", stdout, stderr, exitCode }
     { id, type: "failed", message }

   Проверено: собирается и исполняется std::cin, std::cout,
   строки, векторы, stoi. Диагностика clang приходит как есть,
   с подчёркиванием и номером строки.
   ════════════════════════════════════════════════════════════ */

/* Версия закреплена нарочно: обновление тулчейна не должно
   случиться само по себе посреди семестра. */
const CLANG_URL = "https://cdn.jsdelivr.net/npm/@yowasp/clang@22.0.0-git20542-10/gen/bundle.js";

/* Исключения выключены осознанно: libc++abi в этом пакете собран
   без них, и без флага не линкуется даже std::stoi. Подробности —
   в README дизайн-системы. */
const CXX_FLAGS = ["-std=c++20", "--target=wasm32-wasip1", "-fno-exceptions", "-O1"];

let clang = null;

const ERRNO = { SUCCESS: 0, BADF: 8, INVAL: 28, NOSYS: 52, SPIPE: 70 };

/* ── Минимальная WASI-прослойка ───────────────────────────────
   Браузер не умеет WASI, поэтому десяток нужных вызовов пишем
   сами. Неизвестный импорт заглушается ENOSYS, чтобы модуль
   создавался всегда, а не падал на экзотическом вызове.
   ──────────────────────────────────────────────────────────── */
function makeWasi(stdinText, onOut, onErr) {
  let mem = null;
  const stdin = new TextEncoder().encode(stdinText || "");
  let stdinPos = 0;

  const view = () => new DataView(mem.buffer);
  const bytes = () => new Uint8Array(mem.buffer);

  class ExitSignal extends Error {
    constructor(code) { super("exit"); this.code = code; }
  }

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

    environ_sizes_get(countPtr, sizePtr) {
      const d = view();
      d.setUint32(countPtr, 0, true);
      d.setUint32(sizePtr, 0, true);
      return ERRNO.SUCCESS;
    },
    args_sizes_get(countPtr, sizePtr) {
      const d = view();
      d.setUint32(countPtr, 0, true);
      d.setUint32(sizePtr, 0, true);
      return ERRNO.SUCCESS;
    },
    clock_time_get(id, precision, out) {
      view().setBigUint64(out, BigInt(Date.now()) * 1000000n, true);
      return ERRNO.SUCCESS;
    },
    clock_res_get(id, out) {
      view().setBigUint64(out, 1000000n, true);
      return ERRNO.SUCCESS;
    },
    random_get(ptr, len) {
      crypto.getRandomValues(bytes().subarray(ptr, ptr + len));
      return ERRNO.SUCCESS;
    },
    fd_fdstat_get(fd, out) {
      const d = view();
      d.setUint8(out, 2);                                      // character_device
      d.setUint16(out + 2, 0, true);
      d.setBigUint64(out + 8, 0xffffffffffffffffn, true);
      d.setBigUint64(out + 16, 0xffffffffffffffffn, true);
      return ERRNO.SUCCESS;
    },
    fd_write(fd, iovs, iovsLen, nwritten) {
      const d = view(), b = bytes();
      const parts = [];
      let total = 0;
      for (let i = 0; i < iovsLen; i++) {
        const ptr = d.getUint32(iovs + i * 8, true);
        const len = d.getUint32(iovs + i * 8 + 4, true);
        parts.push(b.slice(ptr, ptr + len));
        total += len;
      }
      const all = new Uint8Array(total);
      let off = 0;
      for (const p of parts) { all.set(p, off); off += p.length; }
      (fd === 2 ? onErr : onOut)(all);
      d.setUint32(nwritten, total, true);
      return ERRNO.SUCCESS;
    },
    fd_read(fd, iovs, iovsLen, nread) {
      const d = view(), b = bytes();
      let got = 0;
      for (let i = 0; i < iovsLen && stdinPos < stdin.length; i++) {
        const ptr = d.getUint32(iovs + i * 8, true);
        const len = d.getUint32(iovs + i * 8 + 4, true);
        const take = Math.min(len, stdin.length - stdinPos);
        b.set(stdin.subarray(stdinPos, stdinPos + take), ptr);
        stdinPos += take;
        got += take;
      }
      d.setUint32(nread, got, true);
      return ERRNO.SUCCESS;
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

/* ── Загрузка тулчейна ────────────────────────────────────── */
async function loadClang(id) {
  if (clang) return clang;
  post(id, { type: "status", text: "toolchain", percent: 0 });
  const mod = await import(CLANG_URL);
  clang = mod.commands;
  return clang;
}

/* ── Сборка и запуск C++ ──────────────────────────────────── */
async function runCpp(id, code, stdin) {
  const commands = await loadClang(id);
  const dec = new TextDecoder();

  let diagnostics = "";
  let binary = null;

  post(id, { type: "status", text: "compiling" });

  try {
    const tree = await commands["clang++"](
      [...CXX_FLAGS, "main.cpp", "-o", "a.out"],
      { "main.cpp": code },
      {
        stderr: (b) => { if (b) diagnostics += dec.decode(b); },
        decodeASCII: false,
        fetchProgress: (e) => {
          if (!e.totalLength) return;
          post(id, { type: "status", text: "toolchain", percent: Math.round((e.doneLength / e.totalLength) * 100) });
        }
      }
    );
    binary = tree && tree["a.out"];
  } catch (e) {
    /* Ненулевой код возврата компилятора — это ошибка в коде
       студента, а не поломка. Диагностику отдаём как есть. */
    return { stdout: "", stderr: diagnostics || String(e && e.message), exitCode: e && e.code ? e.code : 1, stage: "compile" };
  }

  if (!binary) {
    return { stdout: "", stderr: diagnostics || "Kompilācija neizdevās.", exitCode: 1, stage: "compile" };
  }

  post(id, { type: "status", text: "running" });

  let out = "", err = "";
  const wasi = makeWasi(stdin, (b) => { out += dec.decode(b); }, (b) => { err += dec.decode(b); });
  const module = await WebAssembly.compile(binary);
  const instance = await WebAssembly.instantiate(module, wasi.importObject(module));
  wasi.setMemory(instance.exports.memory);

  let exitCode = 0;
  try {
    instance.exports._start();
  } catch (e) {
    if (e instanceof wasi.ExitSignal) exitCode = e.code;
    else { err += (err ? "\n" : "") + String(e && e.message ? e.message : e); exitCode = 1; }
  }

  return { stdout: out, stderr: err || diagnostics, exitCode, stage: "run" };
}

/* ── Шина сообщений ───────────────────────────────────────── */
function post(id, payload) {
  self.postMessage(Object.assign({ id }, payload));
}

self.onmessage = async (event) => {
  const { id, lang, code, stdin } = event.data || {};
  try {
    if (lang === "python") {
      /* Python появится вместе с курсом по Python: Pyodide грузится
         так же лениво и отдаёт тот же результат. */
      throw new Error("engine-not-connected");
    }
    const result = await runCpp(id, code, stdin);
    post(id, { type: "done", ...result });
  } catch (e) {
    post(id, { type: "failed", message: e && e.message ? e.message : String(e) });
  }
};
