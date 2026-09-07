import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']],
  ['/script.js', ['script.js', 'text/javascript; charset=utf-8']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
  ['/assets/istanbul-blue.png', ['assets/istanbul-blue.png', 'image/png']],
  ['/assets/night-study.png', ['assets/night-study.png', 'image/png']],
  ['/assets/alps.png', ['assets/alps.png', 'image/png']],
  ['/assets/kyoto.png', ['assets/kyoto.png', 'image/png']],
  ['/assets/iceland.png', ['assets/iceland.png', 'image/png']],
  ['/assets/new-york.png', ['assets/new-york.png', 'image/png']],
  ['/assets/arel-campus.png', ['assets/arel-campus.png', 'image/png']]
]);
const port = Number(process.env.PORT || 3001);
http.createServer(async (req, res) => {
  const file = files.get(new URL(req.url, 'http://localhost').pathname);
  if (!file) { res.writeHead(404); res.end('Bulunamadı'); return; }
  try {
    const content = await readFile(new URL(file[0], import.meta.url));
    res.writeHead(200, { 'Content-Type': file[1] }); res.end(content);
  } catch { res.writeHead(500); res.end('Dosya okunamadı'); }
}).listen(port, '127.0.0.1', () => console.log(`Önizleme: http://localhost:${port}`));
