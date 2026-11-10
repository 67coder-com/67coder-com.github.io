/* ════════════════════════════════════════════════════════════
   67coder — проверка контента.

   Запускается на GitHub перед каждой публикацией и на каждом
   pull request от агента. Если есть ОШИБКИ — сайт не публикуется,
   а агент (Jules) получает сообщение и сам исправляет файлы.
   ПРЕДУПРЕЖДЕНИЯ публикацию не останавливают.

   Запуск руками: node tools/validate.mjs
   ════════════════════════════════════════════════════════════ */

import fs from "node:fs";
import path from "node:path";

const CONTENT = path.join(process.cwd(), "content");
const KINDS = new Set(["theory", "example", "explain", "video", "predict", "editor",
                       "clickline", "parsons", "blanks", "quiz", "summary"]);
const errors = [], warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);
const pad2 = (n) => (n < 10 ? "0" : "") + n;
const rel = (p) => path.relative(process.cwd(), p);

function read(file, where) {
  if (!fs.existsSync(file)) { err(where, `нет файла ${rel(file)}`); return null; }
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { err(rel(file), `не JSON: ${e.message.split("\n")[0]}`); return null; }
}

const sv = (step, tx, f) => (tx && tx[f] !== undefined ? tx[f] : step[f]);

function checkLesson(courseId, dir, l, published) {
  const n = l.n, where = `${courseId}/урок ${n}`;
  const langs = [...new Set([...(l.locales || []), ...(l.draft || [])])];
  const struct = read(path.join(dir, `lesson-${pad2(n)}.json`), where);
  if (!struct) return;
  const steps = struct.steps || [];
  if (!steps.length) err(where, "в уроке нет шагов");

  const ids = steps.map((s) => s.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) err(where, `повторяются id шагов: ${[...new Set(dup)].join(", ")}`);
  ids.forEach((id) => { if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id || "")) err(where, `id шага «${id}» — только латиница в нижнем регистре, цифры и дефис`); });

  for (const lang of langs) {
    const tFile = path.join(dir, `lesson-${pad2(n)}.${lang}.json`);
    const texts = read(tFile, `${where} (${lang})`);
    if (!texts) continue;
    const tw = `${where} (${lang})`;
    const tIds = Object.keys(texts.steps || {});
    const missing = ids.filter((id) => !tIds.includes(id));
    const extra = tIds.filter((id) => !ids.includes(id));
    if (missing.length) err(tw, `нет текста для шагов: ${missing.join(", ")}`);
    if (extra.length) err(tw, `лишние шаги, которых нет в структуре: ${extra.join(", ")}`);
    if (!texts.title) err(tw, "нет названия урока (title)");

    for (const step of steps) {
      const tx = (texts.steps || {})[step.id] || {};
      const sw = `${tw}, шаг ${step.id}`;
      if (!KINDS.has(step.kind)) { err(sw, `неизвестный тип шага «${step.kind}»`); continue; }
      if (!tx.title && step.kind !== "summary") warn(sw, "нет заголовка");

      if (step.kind === "quiz") {
        const opts = step.options || Object.keys(tx.options || {});
        if (!opts.includes(step.answer)) err(sw, `правильный ответ «${step.answer}» не среди вариантов ${JSON.stringify(opts)}`);
        const noText = opts.filter((o) => !(tx.options || {})[o]);
        if (noText.length) err(sw, `нет текста вариантов: ${noText.join(", ")}`);
      }
      if (step.kind === "clickline") {
        const lines = String(sv(step, tx, "code") || "").split("\n").length;
        if (!(step.answerLine >= 1 && step.answerLine <= lines)) err(sw, `answerLine ${step.answerLine} вне кода из ${lines} строк`);
      }
      if (step.kind === "parsons" && (sv(step, tx, "lines") || []).length < 2) err(sw, "в сборке меньше двух строк");
      if (step.kind === "blanks") {
        const code = String(sv(step, tx, "code") || "");
        const marks = [...code.matchAll(/\[\[(\w+)\]\]/g)].map((m) => m[1]);
        const keys = Object.keys(sv(step, tx, "blanks") || {});
        const noAns = marks.filter((m) => !keys.includes(m));
        const noMark = keys.filter((k) => !marks.includes(k));
        if (!marks.length) err(sw, "в коде нет пропусков [[1]]");
        if (noAns.length) err(sw, `нет ответа для пропусков: ${noAns.join(", ")}`);
        if (noMark.length) err(sw, `ответ без пропуска в коде: ${noMark.join(", ")}`);
      }
      if ((step.kind === "editor" || step.kind === "predict") && step.kind === "predict" && sv(step, tx, "expected") === undefined) {
        err(sw, "у прогноза нет expected");
      }
      if (step.kind === "editor") {
        const code = String(sv(step, tx, "starter") || "") + String(sv(step, tx, "solution") || "");
        if (/\btry\s*\{|\bcatch\s*\(|\bthrow\b/.test(code)) err(sw, "исключения (try/catch/throw) встроенный компилятор не собирает");
        if (/\bfstream\b|\bifstream\b|\bofstream\b/.test(code)) warn(sw, "работа с файлами пока не поддерживается компилятором сайта");
      }

      const img = sv(step, tx, "image") || (step.imagePrompt ? `assets/l${pad2(n)}-${step.id}.jpg` : null);
      if (img && !fs.existsSync(path.join(dir, img))) {
        const msg = `нет картинки ${img}`;
        if (/\.svg$/i.test(img)) (published ? err : warn)(sw, msg);
        else if (published) warn(sw, msg + " — студенты увидят шаг без неё");
      }
      if (/\bMoodle\b/i.test(JSON.stringify(tx))) err(sw, "в тексте урока упоминается Moodle — сайт про Moodle не знает");
    }
  }
}

/* ── Moodle никогда не должен попасть в публичный репозиторий ── */
const moodleDir = path.join(process.cwd(), "moodle");
if (fs.existsSync(moodleDir) && process.env.GITHUB_ACTIONS) {
  err("moodle/", "папка с Moodle-пакетами попала в репозиторий — удалите её оттуда немедленно: там вопросы экзамена");
}

/* ── обход ── */
const courses = read(path.join(CONTENT, "courses.json"), "courses.json");
for (const c of (courses && courses.courses) || []) {
  if (c.status !== "live") continue;
  const dir = path.join(CONTENT, c.id);
  const struct = read(path.join(dir, "course.json"), `${c.id}/course.json`);
  if (!struct) continue;
  const lessons = (struct.modules || []).flatMap((m) => m.lessons || []);
  const nums = lessons.map((l) => l.n);
  if (new Set(nums).size !== nums.length) err(`${c.id}/course.json`, "повторяются номера уроков");

  for (const f of fs.readdirSync(dir).filter((x) => /^course\.[a-z]{2}\.json$/.test(x))) {
    const tx = read(path.join(dir, f), `${c.id}/${f}`);
    if (!tx) continue;
    const noTitle = lessons.filter((l) => !(tx.lessons || {})[l.slug]).map((l) => l.slug);
    if (noTitle.length) warn(`${c.id}/${f}`, `нет названий уроков: ${noTitle.join(", ")}`);
  }

  for (const l of lessons) {
    const published = (l.locales || []).length > 0;
    if (published || (l.draft || []).length) checkLesson(c.id, dir, l, published);
  }
}

/* ── итог ── */
if (warnings.length) console.log(`Предупреждения (${warnings.length}):\n  ` + warnings.join("\n  ") + "\n");
if (errors.length) {
  console.log(`ОШИБКИ (${errors.length}) — публикация остановлена:\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log("Проверка пройдена: контент в порядке.");
