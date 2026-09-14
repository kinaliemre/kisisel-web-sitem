import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { publicFiles, securityHeaders } from './site-config.mjs';

export function createSiteServer() {
  return http.createServer(async (req, res) => {
    for (const [name, value] of Object.entries(securityHeaders)) res.setHeader(name, value);
    res.setHeader('Cache-Control', 'no-cache');
    const respond = (status, message) => {
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : message);
    };
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD');
      respond(405, 'Yönteme izin verilmiyor');
      return;
    }
    let pathname;
    try {
      if (!req.url?.startsWith('/') || req.url.startsWith('//')) throw new Error('Invalid path');
      pathname = new URL(req.url, 'http://localhost').pathname;
    } catch {
      respond(400, 'Geçersiz istek');
      return;
    }
    const filename = pathname === '/' ? 'index.html' : pathname.slice(1);
    const contentType = publicFiles.get(filename);
    if (!contentType) {
      respond(404, 'Bulunamadı');
      return;
    }
    try {
      const content = await readFile(new URL(filename, import.meta.url));
      res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': content.length });
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch {
      respond(500, 'Dosya okunamadı');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 3001);
  createSiteServer().listen(port, '127.0.0.1', () => console.log(`Önizleme: http://localhost:${port}`));
}
