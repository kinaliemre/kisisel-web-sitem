import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import { execFileSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createSiteServer } from '../server.mjs';

test('server serves pages but denies private files, invalid requests and writes', async (t) => {
  const server = createSiteServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const request = (path, method = 'GET') => new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port: server.address().port, path, method }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString() }));
    });
    req.on('error', reject);
    req.end();
  });
  for (const path of ['/', '/hakkimda.html', '/calismalar.html', '/iletisim.html', '/style.css', '/script.js', '/favicon.svg', '/assets/alps.png']) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers['x-content-type-options'], 'nosniff');
    assert.match(response.headers['content-security-policy'], /frame-ancestors 'none'/);
  }
  for (const path of ['/.env', '/.git/config', '/.codex/config.toml', '/server.mjs', '/site-config.mjs', '/package.json', '/README.md', '/assets/PROMPTS.md', '/assets/arel-campus.png', '/assets/', '/%2e%2e/.git/config', '/..%2f.env', '/missing.html']) {
    assert.equal((await request(path)).status, 404, path);
  }
  assert.equal((await request('//invalid/path')).status, 400);
  const post = await request('/', 'POST');
  assert.equal(post.status, 405);
  assert.equal(post.headers.allow, 'GET, HEAD');
  const head = await request('/', 'HEAD');
  assert.equal(head.status, 200);
  assert.equal(head.body, '');
  assert.ok(Number(head.headers['content-length']) > 0);
  assert.equal((await request('/')).status, 200, 'server remains available');
});

test('publication output excludes development files and all local links resolve', async (t) => {
  const temporary = await mkdtemp(join(tmpdir(), 'portfolio-publication-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const expected = ['index.html', 'hakkimda.html', 'calismalar.html', 'iletisim.html', 'style.css', 'script.js', 'favicon.svg', 'assets/alps.png'];
  for (const filename of [...expected, 'build.mjs', 'site-config.mjs']) {
    await cp(new URL(`../${filename}`, import.meta.url), join(temporary, filename), { recursive: true });
  }
  await mkdir(join(temporary, 'dist'), { recursive: true });
  await writeFile(join(temporary, 'dist', 'private-note.txt'), 'must not be published');
  await writeFile(join(temporary, '.env'), 'PRIVATE_TEST_VALUE=not-a-real-secret');
  execFileSync(process.execPath, ['build.mjs'], { cwd: temporary });
  const output = join(temporary, 'dist');
  const files = await readdir(output, { recursive: true, withFileTypes: true });
  assert.equal(files.filter(entry => entry.isFile()).length, expected.length + 1);
  for (const name of expected) assert.ok((await readFile(join(output, name))).length > 0);
  assert.ok(files.every(entry => !['private-note.txt', '.env', 'build.mjs', 'site-config.mjs'].includes(entry.name)));
  for (const name of expected.filter(name => name.endsWith('.html'))) {
    const html = await readFile(join(output, name), 'utf8');
    assert.match(html, /http-equiv="Content-Security-Policy"/);
    assert.doesNotMatch(html, /(?:localhost|127\.0\.0\.1|file:\/\/|\/home\/)/);
    assert.doesNotMatch(html, /\son\w+\s*=|javascript:|<iframe|<form/i);
    for (const [, link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (link.startsWith('#')) {
        assert.ok(html.includes(`id="${link.slice(1)}"`), `${name}: ${link}`);
      } else if (!link.startsWith('https://')) {
        assert.ok(expected.includes(link), `${name}: ${link}`);
      }
    }
  }
  const css = await readFile(join(output, 'style.css'), 'utf8');
  for (const [, asset] of css.matchAll(/url\("([^"]+)"\)/g)) assert.ok(expected.includes(asset));
});
