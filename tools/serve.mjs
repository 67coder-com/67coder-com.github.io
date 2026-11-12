/* ════════════════════════════════════════════════════════════
   67coder — сайт на своём компьютере, для вычитки черновиков.

   Запуск из папки сайта:   node tools/serve.mjs
   Черновики (английский):  http://localhost:8067/?preview#/course/cpp/en

   Показывает файлы прямо из этой папки: агент поправил главу —
   обновили страницу — видно сразу, без ожидания GitHub.
   Работает только на этом компьютере, снаружи недоступен.
   Остановить: Ctrl+C в окне, где запущен.
   ════════════════════════════════════════════════════════════ */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PORT = Number(process.env.PORT) || 8067;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".md": "text/plain; charset=utf-8"
};

http.createServer((req, res) => {
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, "http://localhost").pathname); }
  catch { res.writeHead(400); return res.end(); }
  let file = path.normalize(path.join(ROOT, rel));
  /* только файлы внутри папки сайта; папку moodle/ не отдаём никогда */
  const relPath = path.relative(ROOT, file);
  if (relPath.startsWith("..") || path.isAbsolute(relPath) || /^moodle([\\/]|$)/i.test(relPath)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end("Not found"); }
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Сайт на этом компьютере: http://localhost:${PORT}/`);
  console.log(`Черновики:               http://localhost:${PORT}/?preview#/course/cpp/en`);
});
