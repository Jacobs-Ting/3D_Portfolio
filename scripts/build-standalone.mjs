import { build } from 'esbuild';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
// Classic bundled script + inline CSS: works through file:// without an HTTP server.
const result = await build({
  absWorkingDir: root,
  entryPoints: ['src/main.jsx'],
  outfile: 'standalone/bibi.js',
  bundle: true,
  splitting: false,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  write: false,
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'inline',
});
const js = result.outputFiles.find(file => file.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
const css = result.outputFiles.find(file => file.path.endsWith('.css')).text.replace(/<\/style/gi, '<\\/style');
const icon = Buffer.from(await readFile(new URL('../public/favicon.svg', import.meta.url))).toString('base64');
const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="theme-color" content="#f8f5ed"><title>Bibi's Little World｜鼻鼻的小小世界</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${icon}">
<style>${css}</style></head><body><div id="root"></div><script>${js}</script></body></html>`;
await mkdir(new URL('../standalone/', import.meta.url), { recursive: true });
await writeFile(new URL('../standalone/index.html', import.meta.url), html);
await mkdir(new URL('../dist/standalone/', import.meta.url), { recursive: true });
await writeFile(new URL('../dist/standalone/index.html', import.meta.url), html);
console.log(`Standalone ready: standalone/index.html (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
