'use strict';

const fs = require('fs');
const path = require('path');
const palettes = require('../src/palettes');
const { buildTheme } = require('../src/theme');
const { contrast } = require('../src/color');
const { renderPreview } = require('../src/preview');

const root = path.join(__dirname, '..');
const themesDir = path.join(root, 'themes');
fs.mkdirSync(themesDir, { recursive: true });

// 1 ── Theme files
for (const p of palettes) {
  const file = path.join(themesDir, `${p.id}-color-theme.json`);
  fs.writeFileSync(file, JSON.stringify(buildTheme(p), null, 2) + '\n');
}

// 2 ── Keep package.json's theme list in sync with the palettes
const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.contributes = pkg.contributes || {};
pkg.contributes.themes = palettes.map((p) => ({
  label: p.name,
  uiTheme: p.type === 'dark' ? 'vs-dark' : 'vs',
  path: `./themes/${p.id}-color-theme.json`,
}));
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// 3 ── Preview page (same palettes → what you see is what installs)
fs.mkdirSync(path.join(root, 'preview'), { recursive: true });
fs.writeFileSync(path.join(root, 'preview', 'index.html'), renderPreview(palettes));

// 4 ── Readability audit (WCAG contrast)
const TEXT = 4.5; // code & body text
const SOFT = 3.0; // comments, punctuation, secondary UI
const checks = (p) => {
  const { ui, syntax: s } = p;
  const out = [];
  for (const [role, hex] of Object.entries(s)) {
    const min = role === 'comment' || role === 'punct' ? SOFT : TEXT;
    out.push([`syntax.${role} on editor`, hex, ui.bg, min]);
    out.push([`syntax.${role} on current line`, hex, ui.lift, min]);
  }
  out.push(['fg on editor', ui.fg, ui.bg, 7]);
  out.push(['fgMuted on sidebar', ui.fgMuted, ui.side, TEXT]);
  out.push(['fgSubtle on sidebar', ui.fgSubtle, ui.side, SOFT]);
  out.push(['button text', ui.onButton, ui.button, TEXT]);
  out.push(['text on banner', ui.onBanner, ui.banner, TEXT]);
  out.push(['text on highlight', ui.fg, ui.highlight, TEXT]);
  out.push(['active icon on activity bar', ui.accent2, ui.deep, SOFT]);
  out.push(['accent on editor', ui.accent, ui.bg, SOFT]);
  for (const [k, v] of Object.entries(p.status)) out.push([`status.${k} on editor`, v, ui.bg, SOFT]);
  return out;
};

let failures = 0;
for (const p of palettes) {
  const bad = checks(p)
    .map(([label, fg, bg, min]) => ({ label, ratio: contrast(fg, bg), min }))
    .filter((c) => c.ratio < c.min);
  const tag = bad.length ? '✗' : '✓';
  console.log(`${tag} ${p.name.padEnd(28)} fg/bg ${contrast(p.ui.fg, p.ui.bg).toFixed(1)}:1`);
  for (const b of bad) console.log(`    ${b.label}: ${b.ratio.toFixed(2)} < ${b.min}`);
  failures += bad.length;
}

console.log(`\n${palettes.length} themes written to themes/, preview at preview/index.html`);
if (failures) {
  console.error(`${failures} contrast check(s) failed`);
  process.exit(1);
}
