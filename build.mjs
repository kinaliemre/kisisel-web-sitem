import { copyFile, lstat, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicFiles, contentPolicy, securityHeaders } from './site-config.mjs';

const output = new URL('./dist/', import.meta.url);
// Refuse source symlinks: a public filename must not point to a private file.
for (const filename of publicFiles.keys()) {
  const parts = filename.split('/');
  for (let index = 1; index <= parts.length; index++) {
    const info = await lstat(new URL(parts.slice(0, index).join('/'), import.meta.url));
    if (info.isSymbolicLink()) throw new Error(`Yayın dosyası sembolik bağlantı olamaz: ${filename}`);
  }
}
// Rebuild the generated directory so old or accidentally added files cannot survive.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const filename of publicFiles.keys()) {
  const source = new URL(filename, import.meta.url);
  const target = new URL(filename, output);
  await mkdir(dirname(fileURLToPath(target)), { recursive: true });
  if (filename.endsWith('.html')) {
    const html = await readFile(source, 'utf8');
    const policies = `<meta http-equiv="Content-Security-Policy" content="${contentPolicy}">\n  <meta name="referrer" content="no-referrer">`;
    await writeFile(target, html.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">\n  ${policies}`));
  } else {
    await copyFile(source, target);
  }
}
// Hosts supporting the _headers format apply these to every response.
await writeFile(new URL('_headers', output), `/*\n${Object.entries(securityHeaders).map(([name, value]) => `  ${name}: ${value}`).join('\n')}\n`);
console.log('Yayın hazır: dist/ (yalnızca 8 site dosyası ve güvenlik başlıkları)');
