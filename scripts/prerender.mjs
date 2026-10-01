import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = path.join(projectRoot, 'dist', 'index.html');
const marker = '<!--app-html-->';

const vite = await createServer({
  root: projectRoot,
  configFile: path.join(projectRoot, 'vite.config.js'),
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const markup = renderToString(createElement(App));
  const template = await readFile(outputFile, 'utf8');

  if (!template.includes(marker)) {
    throw new Error(`Pre-render marker not found in ${outputFile}`);
  }

  await writeFile(outputFile, template.replace(marker, markup), 'utf8');
  console.log(`Pre-rendered React page into ${path.relative(projectRoot, outputFile)}.`);
} finally {
  await vite.close();
}
