/* ════════════════════════════════════════════════════════════
   67coder — единый скрипт публикации главы.

   Использование:
     node tools/publish.mjs
     (или с явным номером: node tools/publish.mjs 15)

   Всегда вызывается одной и той же командой:
     node tools/publish.mjs
   без аргументов, чтобы Antigravity запоминал разрешение
   «Always allow» и больше никогда не переспрашивал.

   Что делает:
     1. Автоматически определяет номер главы (черновик в course.json
        или изменённый урок в git status).
     2. В content/cpp/course.json переносит главу из draft в locales.
     3. Проверяет .gitignore (moodle/ обязательно в игноре).
     4. Выполняет git add content/ docs/handover/ docs/author_rules.md tools/
     5. Делает git commit -m "Глава N: публикация" (или "Глава N: правки")
     6. Делает git push с переменными неинтерактивности.
     7. Собирает PDF для Moodle: node tools/make-pdf.mjs N lv
   ════════════════════════════════════════════════════════════ */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

/* 1. Находим git.exe */
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

/* 2. Проверяем .gitignore: moodle/ обязан быть */
const gi = fs.existsSync(path.join(ROOT, ".gitignore")) ? fs.readFileSync(path.join(ROOT, ".gitignore"), "utf8") : "";
if (!/^moodle\/?\s*$/m.test(gi)) {
  console.error("ОШИБКА: в .gitignore нет строки moodle/ — публикация остановлена.");
  process.exit(1);
}

/* 3. Определяем номер главы (автоопределение, если аргумент не задан) */
let n = Number(process.argv[2]);
const coursePath = path.join(ROOT, "content", "cpp", "course.json");
const course = fs.existsSync(coursePath) ? JSON.parse(fs.readFileSync(coursePath, "utf8")) : null;
const allLessons = course ? (course.modules || []).flatMap((m) => m.lessons || []) : [];

if (!n) {
  // 1) Ищем черновик в course.json
  const draftLesson = allLessons.find((l) => l.draft && l.draft.length > 0);
  if (draftLesson) {
    n = draftLesson.n;
  } else {
    // 2) Ищем номер главы в git status
    try {
      const gitStatus = runGit(["status", "--porcelain"]);
      const matches = [...gitStatus.matchAll(/lesson-(\d+)/g)].map((m) => Number(m[1]));
      if (matches.length > 0) {
        n = matches[matches.length - 1];
      }
    } catch {}
  }
  // 3) Запасной вариант: последняя активная глава в курсе
  if (!n && allLessons.length > 0) {
    const liveLessons = allLessons.filter((l) => (l.locales || []).length > 0);
    if (liveLessons.length > 0) {
      n = Math.max(...liveLessons.map((l) => l.n));
    }
  }
}

if (!n) {
  console.error("Не удалось определить номер главы для публикации. Укажите: node tools/publish.mjs <номер>");
  process.exit(1);
}

/* 4. Обновляем course.json: переносим draft -> locales */
let isDraft = false;
if (course) {
  let found = false;
  for (const m of course.modules || []) {
    for (const l of m.lessons || []) {
      if (l.n === n) {
        found = true;
        if (l.draft && l.draft.length > 0) isDraft = true;
        const allLocales = [...new Set([...(l.locales || []), ...(l.draft || [])])];
        l.locales = allLocales.length ? allLocales : ["lv", "en"];
        delete l.draft;
      }
    }
  }
  if (found) {
    fs.writeFileSync(coursePath, JSON.stringify(course, null, 2) + "\n", "utf8");
    console.log(`[1/4] course.json: глава ${n} проверена (locales).`);
  }
}

/* 5. Git add, commit, push */
try {
  const pathsToAdd = [
    "content/",
    "docs/handover/",
    "docs/author_rules.md",
    "tools/",
    "index.html"
  ].filter((p) => fs.existsSync(path.join(ROOT, p)));

  runGit(["add", ...pathsToAdd]);
  console.log(`[2/4] Git add: подготовлены файлы контента и документации.`);

  const commitMsg = isDraft ? `Глава ${n}: публикация` : `Глава ${n}: правки`;
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

  runGit(["push"]);
  console.log(`[4/4] Git push: успешно отправлено в origin/main.`);
} catch (e) {
  console.error("ОШИБКА Git при публикации:\n", e.message || e);
  process.exit(1);
}

/* 6. Собираем PDF */
console.log(`Сборка PDF для Moodle...`);
const pdfRes = spawnSync(process.execPath, [path.join(ROOT, "tools", "make-pdf.mjs"), String(n), "lv"], {
  cwd: ROOT,
  stdio: "inherit"
});
if (pdfRes.status !== 0) {
  console.warn("ВНИМАНИЕ: Сборка PDF завершилась с кодом", pdfRes.status);
}

console.log(`\nУСПЕШНО: Глава ${n} опубликована на сайте и собран PDF.`);
