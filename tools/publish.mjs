/* ════════════════════════════════════════════════════════════
   67coder — единый скрипт публикации главы.

   Использование:
     node tools/publish.mjs <номер_главы>
     node tools/publish.mjs 15

   Что делает:
     1. В content/cpp/course.json переносит главу из draft в locales.
     2. Проверяет .gitignore (moodle/ обязательно в игноре).
     3. Выполняет git add content/ docs/handover/ docs/author_rules.md tools/
     4. Делает git commit -m "Глава N: публикация"
     5. Делает git push с переменными неинтерактивности.
     6. Собирает PDF для Moodle: node tools/make-pdf.mjs N lv
   ════════════════════════════════════════════════════════════ */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const n = Number(process.argv[2]);
if (!n) {
  console.error("Укажите номер главы: node tools/publish.mjs <номер>");
  process.exit(1);
}

const ROOT = process.cwd();

/* 1. Проверяем .gitignore: moodle/ обязан быть */
const gi = fs.existsSync(path.join(ROOT, ".gitignore")) ? fs.readFileSync(path.join(ROOT, ".gitignore"), "utf8") : "";
if (!/^moodle\/?\s*$/m.test(gi)) {
  console.error("ОШИБКА: в .gitignore нет строки moodle/ — публикация остановлена.");
  process.exit(1);
}

/* 2. Обновляем course.json: переносим draft -> locales */
const coursePath = path.join(ROOT, "content", "cpp", "course.json");
if (fs.existsSync(coursePath)) {
  const course = JSON.parse(fs.readFileSync(coursePath, "utf8"));
  let found = false;
  for (const m of course.modules || []) {
    for (const l of m.lessons || []) {
      if (l.n === n) {
        found = true;
        const allLocales = [...new Set([...(l.locales || []), ...(l.draft || [])])];
        l.locales = allLocales.length ? allLocales : ["lv", "en"];
        delete l.draft;
      }
    }
  }
  if (found) {
    fs.writeFileSync(coursePath, JSON.stringify(course, null, 2) + "\n", "utf8");
    console.log(`[1/4] course.json: глава ${n} перенесена в locales.`);
  }
}

/* 3. Находим git.exe */
const GIT_CANDIDATE = "C:\\Data\\67coder\\git\\cmd\\git.exe";
const gitBin = fs.existsSync(GIT_CANDIDATE) ? GIT_CANDIDATE : "git";

const gitEnv = {
  ...process.env,
  GCM_INTERACTIVE: "never",
  GIT_TERMINAL_PROMPT: "0"
};

function runGit(args) {
  const res = spawnSync(gitBin, args, { cwd: ROOT, env: gitEnv, stdio: "pipe", encoding: "utf8" });
  if (res.error) throw res.error;
  if (res.status !== 0) {
    const err = (res.stderr || res.stdout || "").trim();
    throw new Error(`Git error (${args.join(" ")}): ${err}`);
  }
  return res.stdout.trim();
}

try {
  /* git add */
  const pathsToAdd = [
    "content/",
    "docs/handover/",
    "docs/author_rules.md",
    "tools/"
  ].filter((p) => fs.existsSync(path.join(ROOT, p)));

  runGit(["add", ...pathsToAdd]);
  console.log(`[2/4] Git add: подготовлены файлы контента и документации.`);

  /* git commit */
  const commitMsg = `Глава ${n}: публикация`;
  try {
    runGit(["commit", "-m", commitMsg]);
    console.log(`[3/4] Git commit: «${commitMsg}».`);
  } catch (e) {
    if (e.message && e.message.includes("nothing to commit")) {
      console.log(`[3/4] Git commit: изменений нет, продолжаем.`);
    } else {
      throw e;
    }
  }

  /* git push */
  runGit(["push"]);
  console.log(`[4/4] Git push: успешно отправлено в origin/main.`);
} catch (e) {
  console.error("ОШИБКА Git при публикации:\n", e.message || e);
  process.exit(1);
}

/* 4. Собираем PDF */
console.log(`Сборка PDF для Moodle...`);
const pdfRes = spawnSync(process.execPath, [path.join(ROOT, "tools", "make-pdf.mjs"), String(n), "lv"], {
  cwd: ROOT,
  stdio: "inherit"
});
if (pdfRes.status !== 0) {
  console.warn("ВНИМАНИЕ: Сборка PDF завершилась с кодом", pdfRes.status);
}

console.log(`\nУСПЕШНО: Глава ${n} опубликована на сайте и собран PDF.`);
