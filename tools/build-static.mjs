/* ════════════════════════════════════════════════════════════
   67coder — статические страницы для поисковиков.

   Запускается автоматически на GitHub при каждой публикации
   (.github/workflows/publish.yml). Читает content/ и собирает:

     /lv/                 каталог курсов
     /lv/cpp/             страница курса
     /lv/cpp/1/           глава целиком, читаемая без JavaScript
     /en/…                то же на английском
     /sitemap.xml         все адреса для поисковиков

   Интерактивный сайт эти страницы не загружает и о них не знает.
   У каждой страницы — кнопка в интерактивную версию.

   Ответы и решения на статические страницы не попадают:
   это версия для чтения, а не для списывания.

   Запуск руками: node tools/build-static.mjs [папка-вывода]
   ════════════════════════════════════════════════════════════ */

import fs from "node:fs";
import path from "node:path";

const SITE = "https://67coder.com";
const ROOT = process.cwd();
const OUT = path.resolve(process.argv[2] || ROOT);
const CONTENT = path.join(ROOT, "content");

const UI = {
  lv: {
    htmlLang: "lv", ogLocale: "lv_LV",
    catalogTitle: "Kursi", catalogLead: "Interaktīvi programmēšanas kursi: īsas nodaļas, piemēri un koda redaktors tieši pārlūkā.",
    tagline: "programmēšana caur praksi",
    openInteractive: "Atvērt interaktīvo nodaļu", openCourse: "Atvērt interaktīvo kursu",
    chapter: "{n}. nodaļa", soon: "drīzumā", step: "Solis",
    taskPredict: "Uzdevums: paredziet, ko izvadīs programma.",
    taskClick: "Uzdevums: atrodiet rindu, kurā ir kļūda.",
    taskParsons: "Uzdevums: sakārtojiet rindas pareizā secībā.",
    taskBlanks: "Uzdevums: ierakstiet trūkstošos vārdus.",
    starter: "Sākuma kods", expected: "Gaidāmā izvade", hint: "Padoms", optional: "Papilduzdevums",
    archive: "Arhīva ieraksts", deeper: "Dziļāk", sources: "Avoti",
    tryHere: "Uzdevumus var izpildīt interaktīvajā nodaļā — tur ir koda redaktors un pārbaude.",
    otherLang: "English", allCourses: "Visi kursi", lessonsWord: "nodaļas"
  },
  en: {
    htmlLang: "en", ogLocale: "en_US",
    catalogTitle: "Courses", catalogLead: "Interactive programming courses: short chapters, examples and a code editor right in the browser.",
    tagline: "programming through practice",
    openInteractive: "Open the interactive chapter", openCourse: "Open the interactive course",
    chapter: "Chapter {n}", soon: "coming soon", step: "Step",
    taskPredict: "Task: predict what the program prints.",
    taskClick: "Task: find the line with the mistake.",
    taskParsons: "Task: put the lines in the right order.",
    taskBlanks: "Task: fill in the missing words.",
    starter: "Starter code", expected: "Expected output", hint: "Hint", optional: "Extra challenge",
    archive: "Archive record", deeper: "Go deeper", sources: "Sources",
    tryHere: "The tasks can be done in the interactive chapter — it has a code editor and checks your answers.",
    otherLang: "Latviešu", allCourses: "All courses", lessonsWord: "chapters"
  }
};

/* ── утилиты ─────────────────────────────────────────────── */
const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const exists = (p) => fs.existsSync(p);
const pad2 = (n) => (n < 10 ? "0" : "") + n;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rich = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
const plain = (s) => String(s ?? "").replace(/`/g, "");
const paras = (b) => (Array.isArray(b) ? b : b ? [b] : []).map((p) => `<p>${rich(p)}</p>`).join("");
const sv = (step, tx, f) => (tx && tx[f] !== undefined ? tx[f] : step[f]);
const write = (rel, html) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};
const describe = (text, max = 155) => {
  const t = plain(text).replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, t.lastIndexOf(" ", max - 1)) + "…";
};

/* то же перемешивание, что на сайте, — у всех студентов одинаковое */
function seededOrder(seed, n) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const idx = [...Array(n).keys()];
  for (let k = n - 1; k > 0; k--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const r = h % (k + 1); [idx[k], idx[r]] = [idx[r], idx[k]];
  }
  if (n > 1 && idx.every((v, i) => v === i)) idx.push(idx.shift());
  return idx;
}

const codeBlock = (code) => `<pre class="code"><code>${esc(code)}</code></pre>`;

/* ── оболочка страницы ───────────────────────────────────── */
const MARK = `<svg viewBox="51 45 138 150" aria-hidden="true"><path d="M 86 56 L 62 56 L 62 184 L 86 184" fill="none" stroke="#5A5F68" stroke-width="10"/><path d="M 154 56 L 178 56 L 178 184 L 154 184" fill="none" stroke="#5A5F68" stroke-width="10"/><circle cx="97" cy="118" r="18" fill="#D8D0C2" stroke="#5A5F68" stroke-width="4"/><circle cx="143" cy="118" r="18" fill="#D8D0C2" stroke="#5A5F68" stroke-width="4"/><circle cx="101" cy="121" r="7.5" fill="#16181D"/><circle cx="147" cy="121" r="7.5" fill="#16181D"/></svg>`;

const CSS = `
@font-face{font-family:Jost;src:url(/fonts/jost-latin.woff2) format("woff2");font-weight:100 900;font-display:swap}
@font-face{font-family:InterSite;src:url(/fonts/inter-latin.woff2) format("woff2");font-weight:100 900;font-display:swap}
@font-face{font-family:JBM;src:url(/fonts/jetbrainsmono-latin.woff2) format("woff2");font-weight:100 800;font-display:swap}
*{box-sizing:border-box}
body{margin:0;background:#F7F5F1;color:#16181D;font:16px/1.7 InterSite,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:#7A5F2A}
.top{border-bottom:1px solid #DFDAD1;background:#F7F5F1}
.top-in{max-width:820px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#5A5F68;font:500 18px JBM,monospace}
.brand svg{height:24px;width:auto}.brand b{color:#7A5F2A;font-weight:500}.brand i{color:#16181D;font-style:normal}
.lang{margin-left:auto;font:12px JBM,monospace;letter-spacing:1.2px;text-transform:uppercase}
main{max-width:820px;margin:0 auto;padding:36px 24px 72px}
.crumbs{font:12px JBM,monospace;letter-spacing:1.4px;text-transform:uppercase;color:#656A72}
.crumbs a{color:#656A72}
h1{font:300 clamp(30px,5vw,44px)/1.22 Jost,system-ui,sans-serif;margin:10px 0 0}
h2{font:400 24px/1.3 Jost,system-ui,sans-serif;margin:6px 0 0}
h3{font:400 18px/1.35 Jost,system-ui,sans-serif;margin:0}
p,li{color:#2B2E34}
.lead{color:#5A5F68;margin-top:14px}
.eyebrow{font:500 11px JBM,monospace;letter-spacing:1.6px;text-transform:uppercase;color:#656A72}
.cta{display:inline-block;margin-top:22px;padding:12px 20px;border-radius:6px;background:#B99A61;color:#090B0F;text-decoration:none;font-weight:500}
.cta:hover{background:#D1B784}
section.step{margin-top:36px;padding-top:24px;border-top:1px solid #DFDAD1}
pre.code{background:#141821;color:#D8D0C2;border-radius:6px;padding:18px 20px;overflow-x:auto;font:14px/1.7 JBM,monospace;margin:14px 0 0}
pre.code .ln{color:#8A8377;display:inline-block;width:2.4ch;margin-right:14px;text-align:right}
code{font-family:JBM,monospace;font-size:.9em}
p code,li code,h2 code,h3 code,summary code{background:#ECE8E0;border:1px solid #DFDAD1;border-radius:4px;padding:1px 6px;white-space:nowrap}
.label{font:11px JBM,monospace;letter-spacing:1.6px;text-transform:uppercase;color:#656A72;margin-top:16px}
.task{font-weight:600}
.blank{color:#D1B784}
ol.options{padding-left:24px}
details{margin-top:16px;border:1px solid #DFDAD1;border-radius:6px;background:#FFFFFF;padding:2px 18px}
summary{cursor:pointer;padding:12px 0;font-weight:500}
summary .eyebrow{margin-right:10px}
.figure{margin-top:16px;overflow-x:auto}.figure svg{width:100%;min-width:600px;height:auto;display:block}
.figure img{width:100%;border-radius:8px}
ul.lessons{list-style:none;padding:0;margin:14px 0 0;border:1px solid #DFDAD1;border-radius:8px;background:#FFF}
ul.lessons li{padding:12px 18px;border-top:1px solid #DFDAD1;display:flex;gap:14px}
ul.lessons li:first-child{border-top:0}
ul.lessons .n{font:13px JBM,monospace;color:#8E887D;min-width:2.4ch;text-align:right}
ul.lessons .soon{color:#8E887D}
.foot{max-width:820px;margin:0 auto;padding:20px 24px 40px;border-top:1px solid #DFDAD1;font:12px JBM,monospace;color:#8E887D}
`;

function page({ lang, title, description, urlPath, alternates, crumbs, body }) {
  const u = UI[lang];
  const other = Object.keys(alternates).find((l) => l !== lang);
  const alt = Object.entries(alternates)
    .map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE}${p}">`)
    .join("\n") + (alternates.lv ? `\n<link rel="alternate" hreflang="x-default" href="${SITE}${alternates.lv}">` : "");
  return `<!doctype html>
<html lang="${u.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${urlPath}">
${alt}
<meta property="og:type" content="article">
<meta property="og:site_name" content="67coder">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${urlPath}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:locale" content="${u.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F7F5F1">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M10 5 H3 V27 H10' fill='none' stroke='%238C8578' stroke-width='3'/%3E%3Cpath d='M22 5 H29 V27 H22' fill='none' stroke='%238C8578' stroke-width='3'/%3E%3Ccircle cx='12' cy='16' r='3.2' fill='%23D8D0C2' stroke='%2316181D' stroke-width='0.7'/%3E%3Ccircle cx='20' cy='16' r='3.2' fill='%23D8D0C2' stroke='%2316181D' stroke-width='0.7'/%3E%3Ccircle cx='12.7' cy='16.7' r='1.3' fill='%2316181D'/%3E%3Ccircle cx='20.7' cy='16.7' r='1.3' fill='%2316181D'/%3E%3C/svg%3E">
<style>${CSS}</style>
<script data-goatcounter="https://67coder.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</head>
<body>
<header class="top"><div class="top-in">
  <a class="brand" href="/">${MARK}<span>[<b>67</b>]<i>coder</i></span></a>
  ${other ? `<a class="lang" href="${alternates[other]}" hreflang="${other}">${esc(UI[other] ? UI[lang].otherLang : other)}</a>` : ""}
</div></header>
<main>
${crumbs ? `<div class="crumbs">${crumbs}</div>` : ""}
${body}
</main>
<footer class="foot">67coder.com · ${esc(u.tagline)}</footer>
</body>
</html>
`;
}

/* ── шаги главы ──────────────────────────────────────────── */
function figure(courseDir, img) {
  if (!img) return "";
  const file = path.join(courseDir, img);
  if (!exists(file)) return "";
  if (/\.svg$/i.test(img)) {
    const svg = fs.readFileSync(file, "utf8").replace(/<\?xml[^>]*\?>/i, "").replace(/<script[\s\S]*?<\/script>/gi, "");
    return `<div class="figure">${svg}</div>`;
  }
  return `<div class="figure"><img src="/content/${path.relative(CONTENT, file).split(path.sep).join("/")}" alt=""></div>`;
}

function stepHtml(step, tx, u, courseDir, idx) {
  let out = `<section class="step" id="${esc(step.id)}">` +
    `<div class="eyebrow">${u.step} ${idx + 1}${tx.eyebrow ? " · " + esc(plain(tx.eyebrow)) : ""}${step.optional ? " · " + u.optional : ""}</div>` +
    `<h2>${rich(tx.title || "")}</h2>` + paras(tx.body);
  const k = step.kind;
  if (k === "theory" || k === "explain") out += figure(courseDir, sv(step, tx, "image")) + (tx.caption ? `<p>${rich(tx.caption)}</p>` : "");
  if (k === "example") {
    out += figure(courseDir, sv(step, tx, "image"));
    const c = sv(step, tx, "code"); if (c) out += codeBlock(c);
    if (tx.caption) out += `<p>${rich(tx.caption)}</p>`;
  }
  if (k === "predict") out += codeBlock(sv(step, tx, "code") || "") + `<p class="task">${u.taskPredict}</p>`;
  if (k === "editor") {
    const shown = sv(step, tx, "code"), starter = sv(step, tx, "starter"), expected = sv(step, tx, "expected");
    if (shown) out += codeBlock(shown);
    if (tx.task) out += `<p class="task">${rich(tx.task)}</p>`;
    if (starter) out += `<div class="label">${u.starter}</div>` + codeBlock(starter);
    if (expected !== undefined && !step.hideExpected) out += `<div class="label">${u.expected}</div>` + codeBlock(String(expected));
    if (tx.hint) out += `<details><summary>${u.hint}</summary><p>${rich(tx.hint)}</p></details>`;
  }
  if (k === "clickline") {
    const lines = String(sv(step, tx, "code") || "").split("\n");
    out += `<pre class="code"><code>${lines.map((l, i) => `<span class="ln">${i + 1}</span>${esc(l)}`).join("\n")}</code></pre>` +
      `<p class="task">${u.taskClick}</p>`;
  }
  if (k === "parsons") {
    const lines = sv(step, tx, "lines") || [];
    const order = seededOrder(step.id, lines.length);
    out += `<pre class="code"><code>${order.map((li, i) => `<span class="ln">${"ABCDEFGHIJ"[i]}</span>${esc(lines[li])}`).join("\n")}</code></pre>` +
      `<p class="task">${u.taskParsons}</p>`;
  }
  if (k === "blanks") {
    const code = String(sv(step, tx, "code") || "");
    out += `<pre class="code"><code>${esc(code).replace(/\[\[(\w+)\]\]/g, '<span class="blank">($1)______</span>')}</code></pre>` +
      `<p class="task">${u.taskBlanks}</p>`;
  }
  if (k === "quiz") {
    const c = sv(step, tx, "code"); if (c) out += codeBlock(c);
    const ids = step.options || Object.keys(tx.options || {});
    out += `<ol class="options" type="A">${ids.map((id) => `<li>${rich((tx.options || {})[id] || id)}</li>`).join("")}</ol>`;
  }
  if (k === "summary" && (tx.points || []).length) out += `<ul>${tx.points.map((p) => `<li>${rich(p)}</li>`).join("")}</ul>`;

  for (const m of tx.more || []) {
    const src = (m.sources || []).length
      ? `<p class="label">${u.sources}</p><ul>${m.sources.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}">${esc(s.title || s.url)}</a>` : esc(s.title || "")}</li>`).join("")}</ul>`
      : "";
    out += `<details><summary><span class="eyebrow">${m.kind === "archive" ? u.archive : u.deeper}</span>${rich(m.title || "")}</summary>${paras(m.body)}${src}</details>`;
  }
  return out + "</section>";
}

/* ── сборка ──────────────────────────────────────────────── */
const urls = ["/"];
const courses = readJSON(path.join(CONTENT, "courses.json")).courses || [];
const langs = Object.keys(UI);
const report = { pages: 0, skipped: [] };

for (const lang of langs) {
  const u = UI[lang];
  const live = [];

  for (const course of courses.filter((c) => c.status === "live")) {
    const dir = path.join(CONTENT, course.id);
    const structFile = path.join(dir, "course.json"), textFile = path.join(dir, `course.${lang}.json`);
    if (!exists(structFile) || !exists(textFile)) { report.skipped.push(`${course.id}/${lang}: нет course-файлов`); continue; }
    const struct = readJSON(structFile), ctext = readJSON(textFile);
    const courseTitle = course.title?.[lang] || course.id;
    const coursePath = `/${lang}/${course.id}/`;
    live.push({ course, courseTitle, coursePath });

    /* страница курса */
    const modulesHtml = (struct.modules || []).map((m) => {
      const items = (m.lessons || []).map((l) => {
        const title = ctext.lessons?.[l.slug] || l.slug;
        const ready = (l.locales || []).includes(lang) && exists(path.join(dir, `lesson-${pad2(l.n)}.${lang}.json`));
        return `<li><span class="n">${pad2(l.n)}</span>` +
          (ready ? `<a href="/${lang}/${course.id}/${l.n}/">${rich(title)}</a>` : `<span class="soon">${rich(title)} · ${u.soon}</span>`) + "</li>";
      }).join("");
      return `<h2 style="margin-top:34px">${rich(ctext.modules?.[m.id] || m.id)}</h2><ul class="lessons">${items}</ul>`;
    }).join("");
    const altCourse = Object.fromEntries(langs.filter((l) => exists(path.join(dir, `course.${l}.json`))).map((l) => [l, `/${l}/${course.id}/`]));
    write(`${lang}/${course.id}/index.html`, page({
      lang, urlPath: coursePath, alternates: altCourse,
      title: `${courseTitle} — 67coder`,
      description: describe(course.summary?.[lang] || ""),
      crumbs: `<a href="/${lang}/">${u.allCourses}</a>`,
      body: `<h1>${rich(courseTitle)}</h1><p class="lead">${rich(course.summary?.[lang] || "")}</p>` +
        `<a class="cta" href="/#/course/${course.id}/${lang}">${u.openCourse} →</a>` + modulesHtml
    }));
    urls.push(coursePath); report.pages++;

    /* главы */
    for (const m of struct.modules || []) for (const l of m.lessons || []) {
      if (!(l.locales || []).includes(lang)) continue;
      const sFile = path.join(dir, `lesson-${pad2(l.n)}.json`), tFile = path.join(dir, `lesson-${pad2(l.n)}.${lang}.json`);
      try {
        if (!exists(sFile) || !exists(tFile)) throw new Error("нет файлов урока");
        const data = readJSON(sFile), texts = readJSON(tFile);
        const steps = data.steps || [];
        const title = texts.title || ctext.lessons?.[l.slug] || l.slug;
        const first = steps.map((s) => texts.steps?.[s.id]?.body).find(Boolean);
        const lessonPath = `/${lang}/${course.id}/${l.n}/`;
        const alt = Object.fromEntries(langs.filter((x) => (l.locales || []).includes(x)).map((x) => [x, `/${x}/${course.id}/${l.n}/`]));
        const interactive = `/#/course/${course.id}/${lang}/lesson/${l.n}`;
        write(`${lang}/${course.id}/${l.n}/index.html`, page({
          lang, urlPath: lessonPath, alternates: alt,
          title: `${plain(title)} — ${courseTitle} · 67coder`,
          description: describe(Array.isArray(first) ? first.join(" ") : first || course.summary?.[lang] || ""),
          crumbs: `<a href="/${lang}/">${u.allCourses}</a> / <a href="${coursePath}">${esc(courseTitle)}</a>` +
            (texts.module ? ` / ${esc(plain(texts.module))}` : "") + ` / ${u.chapter.replace("{n}", l.n)}`,
          body: `<h1>${rich(title)}</h1><a class="cta" href="${interactive}">${u.openInteractive} →</a>` +
            `<p class="lead">${u.tryHere}</p>` +
            steps.map((s, i) => stepHtml(s, texts.steps?.[s.id] || {}, u, dir, i)).join("") +
            `<a class="cta" href="${interactive}">${u.openInteractive} →</a>`
        }));
        urls.push(lessonPath); report.pages++;
      } catch (e) {
        report.skipped.push(`${course.id}/${lang}/${l.n}: ${e.message}`);
      }
    }
  }

  /* каталог */
  write(`${lang}/index.html`, page({
    lang, urlPath: `/${lang}/`, alternates: Object.fromEntries(langs.map((l) => [l, `/${l}/`])),
    title: `${u.catalogTitle} — 67coder · ${u.tagline}`,
    description: u.catalogLead,
    body: `<h1>${u.catalogTitle}</h1><p class="lead">${u.catalogLead}</p>` +
      `<ul class="lessons">${live.map((c) => `<li><a href="${c.coursePath}">${esc(c.courseTitle)}</a></li>`).join("")}</ul>`
  }));
  urls.push(`/${lang}/`); report.pages++;
}

fs.writeFileSync(path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [...new Set(urls)].map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join("\n") + "\n</urlset>\n");

console.log(`Готово: ${report.pages} страниц, ${urls.length} адресов в sitemap.xml`);
if (report.skipped.length) console.log("Пропущено:\n  " + report.skipped.join("\n  "));
