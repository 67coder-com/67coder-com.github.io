/* ════════════════════════════════════════════════════════════
   67coder — PDF главы для Moodle.

   node tools/make-pdf.mjs 3          → moodle/lesson-03.lv.pdf
   node tools/make-pdf.mjs 3 en       → moodle/lesson-03.en.pdf

   Поднимает сайт на этом компьютере, открывает печатную версию главы
   в режиме ?pdf=moodle (без упоминаний 67coder, в стиле университета)
   и печатает её в PDF браузером Chrome или Edge без окна. Файл ложится
   в папку moodle/, которая не попадает в git.
   ════════════════════════════════════════════════════════════ */

import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const n = Number(process.argv[2]);
const lang = process.argv[3] || "lv";
if (!n) { console.log("Укажите номер главы: node tools/make-pdf.mjs 3 [lv|en]"); process.exit(1); }

const ROOT = process.cwd();
const PORT = 8068;
const pad2 = (x) => (x < 10 ? "0" : "") + x;
const outDir = path.join(ROOT, "moodle");
const out = path.join(outDir, `lesson-${pad2(n)}.${lang}.pdf`);

/* безопасность: moodle/ обязан быть в .gitignore */
const gi = fs.existsSync(path.join(ROOT, ".gitignore")) ? fs.readFileSync(path.join(ROOT, ".gitignore"), "utf8") : "";
if (!/^moodle\/?\s*$/m.test(gi)) { console.log("В .gitignore нет строки moodle/ — PDF не создаю, чтобы он не попал в репозиторий."); process.exit(1); }

function findBrowser() {
  const env = process.env;
  const candidates = [
    env.CHROME,
    env.PROGRAMFILES && path.join(env.PROGRAMFILES, "Google", "Chrome", "Application", "chrome.exe"),
    env["PROGRAMFILES(X86)"] && path.join(env["PROGRAMFILES(X86)"], "Google", "Chrome", "Application", "chrome.exe"),
    env.LOCALAPPDATA && path.join(env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
    env["PROGRAMFILES(X86)"] && path.join(env["PROGRAMFILES(X86)"], "Microsoft", "Edge", "Application", "msedge.exe"),
    env.PROGRAMFILES && path.join(env.PROGRAMFILES, "Microsoft", "Edge", "Application", "msedge.exe"),
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p));
}

const browser = findBrowser();
if (!browser) { console.log("Не нашла Chrome или Edge. Укажите путь: $env:CHROME='C:\\…\\chrome.exe'"); process.exit(1); }

fs.mkdirSync(outDir, { recursive: true });
const server = spawn(process.execPath, [path.join(ROOT, "tools", "serve.mjs")], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) }, stdio: "ignore" });

await new Promise((r) => setTimeout(r, 1200));
const url = `http://localhost:${PORT}/?pdf=moodle#/course/cpp/${lang}/print/${n}`;
const profile = path.join(process.env.TEMP || process.env.TMPDIR || "/tmp", "67coder-pdf-profile");

const res = spawnSync(browser, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--user-data-dir=${profile}`,
  "--no-pdf-header-footer", "--print-to-pdf-no-header",
  "--virtual-time-budget=15000",
  `--print-to-pdf=${out}`,
  url
], { stdio: "pipe", timeout: 90000 });

server.kill();

if (fs.existsSync(out) && fs.statSync(out).size > 10000) {
  console.log(`Готово: ${path.relative(ROOT, out)} (${Math.round(fs.statSync(out).size / 1024)} КБ)`);
} else {
  console.log("PDF не получился.");
  if (res.stderr) console.log(String(res.stderr).split("\n").slice(-8).join("\n"));
  process.exit(1);
}
