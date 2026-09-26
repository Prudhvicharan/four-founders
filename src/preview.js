'use strict';

const { mix, alpha, contrast } = require('./color');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Sample code: [role, text, flags?]  roles map to palette.syntax keys
const CODE = [
  [['comment', '// The hat weighs every trait before it decides']],
  [['keyword', 'import '], ['punct', '{ '], ['type', 'House'], ['punct', ', '], ['keyword', 'type '], ['type', 'Student'], ['punct', ' } '], ['keyword', 'from '], ['string', '"./houses"'], ['punct', ';']],
  [],
  [['keyword', 'const '], ['constant', 'TRAITS'], ['operator', ' = '], ['regex', '/brave|cunning|wise|loyal/i'], ['punct', ';']],
  [['keyword', 'const '], ['constant', 'THRESHOLD'], ['operator', ' = '], ['number', '0.75'], ['punct', ';']],
  [],
  [['keyword', 'export function '], ['func', 'sort'], ['punct', '('], ['param', 'student'], ['operator', ': '], ['type', 'Student'], ['punct', ')'], ['operator', ': '], ['type', 'House'], ['punct', ' {']],
  [['variable', '  '], ['keyword', 'const '], ['variable', 'scores'], ['operator', ' = '], ['keyword', 'new '], ['type', 'Map'], ['operator', '<'], ['type', 'House'], ['punct', ', '], ['type', 'number'], ['operator', '>'], ['punct', '();']],
  [['variable', '  '], ['keyword', 'for '], ['punct', '('], ['keyword', 'const '], ['variable', 'trait'], ['keyword', ' of '], ['param', 'student'], ['operator', '.'], ['property', 'traits'], ['punct', ') {']],
  [['variable', '    '], ['keyword', 'if '], ['punct', '('], ['operator', '!'], ['constant', 'TRAITS'], ['operator', '.'], ['func', 'test'], ['punct', '('], ['variable', 'trait'], ['punct', ')) '], ['keyword', 'continue'], ['punct', ';']],
  [['variable', '    '], ['keyword', 'const '], ['variable', 'house', 'sel'], ['operator', ' = '], ['func', 'houseOf'], ['punct', '('], ['variable', 'trait'], ['punct', ');']],
  [['variable', '    '], ['variable', 'scores'], ['operator', '.'], ['func', 'set'], ['punct', '('], ['variable', 'house', 'hl'], ['punct', ', ('], ['variable', 'scores'], ['operator', '.'], ['func', 'get'], ['punct', '('], ['variable', 'house', 'hl'], ['punct', ')'], ['operator', ' ?? '], ['number', '0'], ['punct', ')'], ['operator', ' + '], ['number', '1'], ['punct', ');']],
  [['punct', '  }']],
  [['variable', '  '], ['keyword', 'return '], ['func', 'pick'], ['punct', '('], ['variable', 'scores'], ['punct', ', '], ['constant', 'THRESHOLD'], ['punct', ')'], ['operator', ' ?? '], ['type', 'House'], ['operator', '.'], ['constant', 'Undecided', 'err'], ['punct', ';']],
  [['punct', '}']],
];
const CURSOR_LINE = 10; // zero-based → line 11

function renderCode(p) {
  const { syntax: s, ui } = p;
  const brackets = [s.func, s.keyword, s.type]; // editorBracketHighlight 1–3
  let depth = 0;
  const rows = CODE.map((line, i) => {
    let html = '';
    for (const [role, text, flag] of line) {
      if (role === 'punct') {
        // Bracket-pair colourisation, as VS Code does by default
        for (const ch of text) {
          if ('([{'.includes(ch)) html += `<span style="color:${brackets[depth++ % 3]}">${ch}</span>`;
          else if (')]}'.includes(ch)) html += `<span style="color:${brackets[--depth % 3]}">${ch}</span>`;
          else html += `<span style="color:${s.punct}">${esc(ch)}</span>`;
        }
        continue;
      }
      const italic = role === 'comment' ? 'font-style:italic;' : '';
      let deco = '';
      if (flag === 'sel') deco = `background:${alpha(ui.accent, p.type === 'dark' ? 0.32 : 0.24)};`;
      if (flag === 'hl') deco = `background:${alpha(ui.accent, p.type === 'dark' ? 0.16 : 0.12)};`;
      if (flag === 'err') deco = `text-decoration:underline wavy ${p.status.error};text-underline-offset:3px;text-decoration-thickness:1px;`;
      html += `<span style="color:${s[role]};${italic}${deco}">${esc(text)}</span>`;
      if (flag === 'sel') html += `<i class="cursor" style="background:${ui.accent2}"></i>`;
    }
    const active = i === CURSOR_LINE;
    return `<div class="ln"${active ? ` style="background:${ui.lift}"` : ''}><span class="no" style="color:${active ? ui.accent2 : alpha(ui.fgSubtle, 0.7)}">${i + 1}</span><span class="tx">${html || '&nbsp;'}</span></div>`;
  });
  return rows.join('');
}

function renderMinimap(p) {
  return CODE.map((line) => {
    const bars = line
      .filter(([, t]) => t.trim())
      .map(([role, text]) => {
        const lead = text.length - text.trimStart().length;
        return `<b style="margin-left:${lead * 0.06}em;width:${text.trim().length * 0.12}em;background:${alpha(p.syntax[role], 0.55)}"></b>`;
      })
      .join('');
    return `<div>${bars}</div>`;
  }).join('');
}

const ICONS = {
  files: '<path d="M4 3h7l4 4v10H4z M11 3v4h4" />',
  search: '<circle cx="8.5" cy="8.5" r="4.5"/><path d="M12 12l4.5 4.5"/>',
  git: '<circle cx="6" cy="4.5" r="1.8"/><circle cx="6" cy="15.5" r="1.8"/><circle cx="14" cy="8" r="1.8"/><path d="M6 6.3v7.4M14 9.8c0 3-8 2-8 3.9"/>',
  debug: '<path d="M6 4l10 6-10 6z"/>',
  ext: '<rect x="3" y="3" width="6" height="6"/><rect x="11" y="3" width="6" height="6"/><rect x="3" y="11" width="6" height="6"/><rect x="11" y="11" width="6" height="6"/>',
};
const icon = (name, color) =>
  `<svg viewBox="0 0 20 20" fill="none" stroke="${color}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICONS[name]}</svg>`;

function renderWindow(p) {
  const { ui, status: st, syntax: sx, ansi } = p;
  const dark = p.type === 'dark';
  const lights = [alpha(ui.onBanner, 0.55), alpha(ui.onBanner, 0.4), alpha(ui.onBanner, 0.28)];

  const files = [
    { name: 'sorting-hat.ts', glyph: 'TS', glyphColor: sx.keyword, color: ui.fg, active: true, indent: 2 },
    { name: 'houses.ts', glyph: 'TS', glyphColor: sx.keyword, color: st.modified, badge: 'M', indent: 2 },
    { name: 'spells.sql', glyph: '≡', glyphColor: sx.type, color: st.added, badge: 'U', indent: 2 },
    { name: 'potions.py', glyph: 'PY', glyphColor: sx.func, color: st.error, badge: '2', indent: 2 },
    { name: 'README.md', glyph: 'M↓', glyphColor: sx.link, color: ui.fgMuted, indent: 1 },
    { name: 'package.json', glyph: '{}', glyphColor: sx.number, color: ui.fgMuted, indent: 1 },
    { name: '.env', glyph: '·', glyphColor: ui.fgSubtle, color: ui.fgSubtle, indent: 1 },
  ];
  const tree = files
    .map(
      (f) => `<div class="row" style="padding-left:${f.indent * 0.8}em;color:${f.color};${f.active ? `background:${ui.highlight};` : ''}"><span class="glyph" style="color:${f.glyphColor}">${esc(f.glyph)}</span><span class="fn">${esc(f.name)}</span>${f.badge ? `<span class="gb">${f.badge}</span>` : ''}</div>`
    )
    .join('');

  return `
<div class="win" style="background:${ui.bg};border-color:${ui.border};color:${ui.fg}">
  <div class="title" style="background:${ui.banner};color:${ui.onBanner}">
    <span class="lights">${lights.map((c) => `<i style="background:${c}"></i>`).join('')}</span>
    <span class="cc" style="background:${alpha(ui.onBanner, 0.08)};border:1px solid ${alpha(ui.onBanner, 0.22)}">four-founders</span>
  </div>
  <div class="body">
    <div class="act" style="background:${ui.deep};border-right:1px solid ${ui.border}">
      <span class="ai on" style="box-shadow:inset 2px 0 ${ui.accent};background:${alpha(ui.accent, 0.08)}">${icon('files', ui.accent2)}</span>
      <span class="ai">${icon('search', ui.fgSubtle)}</span>
      <span class="ai">${icon('git', ui.fgSubtle)}<em style="background:${ui.button};color:${ui.onButton}">3</em></span>
      <span class="ai">${icon('debug', ui.fgSubtle)}</span>
      <span class="ai">${icon('ext', ui.fgSubtle)}</span>
    </div>
    <div class="side" style="background:${ui.side};border-right:1px solid ${ui.border};color:${ui.fgMuted}">
      <div class="sh">EXPLORER</div>
      <div class="row" style="color:${ui.fg};font-weight:600">⌄ FOUR-FOUNDERS</div>
      <div class="row" style="padding-left:.8em;color:${ui.fg}">⌄ src</div>
      ${tree}
      <div class="sh sh2" style="border-top:1px solid ${ui.border}">› OUTLINE</div>
    </div>
    <div class="main">
      <div class="tabs" style="background:${ui.side};border-bottom:1px solid ${ui.border}">
        <span class="tab" style="background:${ui.bg};color:${ui.fg};box-shadow:inset 0 1px ${ui.accent}"><span style="color:${sx.keyword}">TS</span> sorting-hat.ts <span style="color:${ui.fgSubtle}">×</span></span>
        <span class="tab" style="color:${st.modified}"><span style="color:${sx.keyword}">TS</span> houses.ts <span style="color:${ui.accent2}">●</span></span>
        <span class="tab" style="color:${ui.fgSubtle}"><span style="color:${sx.func}">PY</span> potions.py</span>
      </div>
      <div class="crumbs" style="color:${ui.fgSubtle}">src › sorting-hat.ts › <span style="color:${sx.func}">ƒ</span> <span style="color:${ui.fg}">sort</span></div>
      <div class="editor">
        <div class="code">${renderCode(p)}</div>
        <div class="mini" style="border-left:1px solid ${alpha(ui.fg, 0.04)}"><div class="slider" style="background:${alpha(ui.fg, 0.06)}"></div>${renderMinimap(p)}</div>
      </div>
      <div class="panel" style="background:${ui.side};border-top:1px solid ${ui.border}">
        <div class="ptabs" style="color:${ui.fgSubtle}">
          <span>PROBLEMS <em style="background:${alpha(ui.accent, 0.25)};color:${ui.fg}">1</em></span><span>OUTPUT</span>
          <span style="color:${ui.fg};box-shadow:inset 0 -1px ${ui.accent}">TERMINAL</span>
        </div>
        <div class="term">
          <div><span style="color:${ansi.blue}">~/four-founders</span> <span style="color:${ansi.magenta}">main</span> <span style="color:${ansi.green}">❯</span> <span style="color:${ui.fg}">npm run build</span></div>
          <div><span style="color:${ansi.green}">✓</span> <span style="color:${ui.fgMuted}">8 themes written to</span> <span style="color:${ansi.cyan}">themes/</span></div>
          <div><span style="color:${ansi.yellow}">!</span> <span style="color:${ui.fgMuted}">Property</span> <span style="color:${ansi.yellow}">'Undecided'</span> <span style="color:${ui.fgMuted}">does not exist on</span> <span style="color:${ansi.red}">House</span></div>
          <div><span style="color:${ansi.blue}">~/four-founders</span> <span style="color:${ansi.magenta}">main</span> <span style="color:${ansi.green}">❯</span> <i class="block" style="background:${ui.accent2}"></i></div>
        </div>
      </div>
    </div>
  </div>
  <div class="status" style="background:${ui.banner};color:${ui.onBanner}">
    <span class="remote" style="background:${alpha(ui.onBanner, 0.16)}">⌁</span>
    <span>⎇ main*</span>
    <span>⊗ 1 ⚠ 0</span>
    <span class="grow"></span>
    <span>Ln 11, Col 16</span><span>UTF-8</span><span>TypeScript</span>
  </div>
</div>`;
}

function renderCard(p) {
  const { ui, syntax: sx } = p;
  const chips = [
    ['Banner', ui.banner], ['Highlight', ui.highlight], ['Editor', ui.bg], ['Accent', ui.accent],
  ];
  const code = [
    ['Keyword', sx.keyword], ['Function', sx.func], ['Type', sx.type], ['String', sx.string],
    ['Number', sx.number], ['Constant', sx.constant], ['Comment', sx.comment],
  ];
  const ratio = contrast(ui.fg, ui.bg).toFixed(1);
  return `
<article class="card" data-type="${p.type}" data-house="${p.house.toLowerCase()}" id="${p.id}">
  <button class="frame" type="button" aria-label="Enlarge ${esc(p.name)}" aria-expanded="false">${renderWindow(p)}</button>
  <div class="meta">
    <div class="name">
      <h3>${esc(p.house)} <span>${p.type === 'dark' ? 'Dark' : 'Light'}</span></h3>
      <p>${esc(p.mood)}</p>
    </div>
    <div class="swatches">
      <div class="sw-ui">${chips.map(([l, c]) => `<span class="chip" title="${l} ${c}"><i style="background:${c}"></i>${c}</span>`).join('')}</div>
      <div class="sw-code" aria-label="Syntax colours">${code.map(([l, c]) => `<i title="${l} ${c}" style="background:${c}"></i>`).join('')}<span class="ratio">text ${ratio}:1</span></div>
    </div>
  </div>
</article>`;
}

function renderPreview(palettes) {
  return `<title>Four Founders</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap">
<style>
:root {
  --ground: #ECE8E1;
  --surface: #F6F3EE;
  --ink: #23201D;
  --muted: #69625A;
  --rule: #D6CEC2;
  --gold: #8E6D32;
  --focus: #8E6D32;
  --display: "IM Fell English", "Iowan Old Style", Georgia, serif;
  --body: "Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ground: #161514; --surface: #1D1C1A; --ink: #E7E0D5; --muted: #9D968B; --rule: #2F2C28; --gold: #C9A96E; --focus: #C9A96E;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --ground: #161514; --surface: #1D1C1A; --ink: #E7E0D5; --muted: #9D968B; --rule: #2F2C28; --gold: #C9A96E; --focus: #C9A96E;
  color-scheme: dark;
}
* { box-sizing: border-box; }
body { background: var(--ground); color: var(--ink); font: 15px/1.55 var(--body); }
.page { max-width: 1320px; margin: 0 auto; padding-inline: clamp(16px, 4vw, 48px); padding-block: 48px 72px; }

header { display: grid; gap: 20px; grid-template-columns: 1fr auto; align-items: end; padding-bottom: 28px; border-bottom: 1px solid var(--rule); }
h1 { font: 400 clamp(44px, 7vw, 84px)/0.95 var(--display); margin: 0; letter-spacing: -0.01em; text-wrap: balance; }
h1 em { color: var(--gold); }
.lede { margin: 14px 0 0; max-width: 60ch; color: var(--muted); font-size: 16px; }
.lede strong { color: var(--ink); font-weight: 600; }
.filters { display: flex; gap: 4px; padding: 4px; border: 1px solid var(--rule); border-radius: 999px; background: var(--surface); }
.filters button { font: 500 13px var(--body); color: var(--muted); background: none; border: 0; padding: 7px 14px; border-radius: 999px; cursor: pointer; }
.filters button[aria-pressed="true"] { background: var(--ink); color: var(--ground); }
button:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }

.principles { display: flex; flex-wrap: wrap; gap: 8px 24px; margin: 18px 0 36px; padding: 0; list-style: none; font-size: 13px; color: var(--muted); }
.principles li::before { content: "✦ "; color: var(--gold); }

.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 44px 32px; }
.card { display: grid; gap: 14px; min-width: 0; align-content: start; }
.card.big { grid-column: 1 / -1; }
.frame { all: unset; display: block; cursor: zoom-in; border-radius: 10px; container-type: inline-size; }
.card.big .frame { cursor: zoom-out; }
.frame:focus-visible { outline: 2px solid var(--focus); outline-offset: 4px; }

.meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px 20px; align-items: start; }
.name h3 { margin: 0; font: 400 26px/1.1 var(--display); }
.name h3 span { font-style: italic; color: var(--muted); }
.name p { margin: 4px 0 0; font-size: 13px; color: var(--muted); }
.swatches { display: grid; gap: 8px; justify-items: end; }
.sw-ui { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
.chip { display: inline-flex; align-items: center; gap: 6px; font: 11px var(--mono); color: var(--muted); padding: 3px 8px 3px 4px; border: 1px solid var(--rule); border-radius: 999px; background: var(--surface); }
.chip i { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(128,128,128,.25); }
.sw-code { display: flex; align-items: center; gap: 4px; }
.sw-code i { width: 18px; height: 6px; border-radius: 3px; }
.ratio { margin-left: 8px; font: 11px var(--mono); color: var(--muted); font-variant-numeric: tabular-nums; }

/* ── mock VS Code window, sized off its own width ── */
.win { font-size: 1.62cqw; border: 1px solid; border-radius: 10px; overflow: hidden; font-family: var(--mono); box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 14px 40px -18px rgba(0,0,0,.35); transition: transform .25s ease; }
.frame:hover .win { transform: translateY(-2px); }
.title { display: flex; align-items: center; justify-content: center; position: relative; height: 2.6em; }
.lights { position: absolute; left: 1em; display: flex; gap: .5em; }
.lights i { width: .95em; height: .95em; border-radius: 50%; }
.cc { font-size: .9em; padding: .25em 6em; border-radius: .5em; }
.body { display: grid; grid-template-columns: 3.6em 13.5em 1fr; }
.act { display: flex; flex-direction: column; align-items: center; padding-top: .5em; gap: .35em; }
.ai { position: relative; width: 100%; display: grid; place-items: center; padding: .55em 0; }
.ai svg { width: 1.7em; height: 1.7em; }
.ai em { position: absolute; right: .45em; bottom: .3em; font: 600 .62em/1 var(--body); font-style: normal; padding: .2em .4em; border-radius: 1em; }
.side { font-size: .95em; padding-bottom: .5em; }
.sh { padding: .8em 1.2em .6em; font-size: .85em; letter-spacing: .06em; }
.sh2 { margin-top: .8em; }
.row { display: flex; align-items: center; gap: .5em; padding: .2em 1em; white-space: nowrap; }
.glyph { font-size: .75em; font-weight: 600; width: 1.8em; text-align: center; }
.fn { flex: 1; overflow: hidden; text-overflow: ellipsis; }
.gb { font-size: .85em; }
.main { display: flex; flex-direction: column; min-width: 0; }
.tabs { display: flex; white-space: nowrap; overflow: hidden; }
.tab { display: inline-flex; gap: .5em; align-items: center; padding: .6em 1.1em; font-size: .95em; }
.tab > span:first-child { font-size: .75em; font-weight: 600; }
.crumbs { padding: .35em 1.2em; font-size: .88em; }
.editor { display: grid; grid-template-columns: 1fr 5em; }
.code { padding: .2em 0 .8em; font-size: 1em; line-height: 1.6; overflow: hidden; }
.ln { display: flex; white-space: pre; }
.no { width: 3.4em; padding-right: 1.2em; text-align: right; flex: none; }
.tx { flex: 1; }
.cursor { display: inline-block; width: 2px; height: 1.2em; vertical-align: -0.2em; }
.mini { position: relative; padding: .4em .5em; }
.mini > div:not(.slider) { display: flex; gap: .12em; height: .34em; margin-bottom: .16em; }
.mini b { display: block; height: 100%; border-radius: 1px; }
.slider { position: absolute; inset: 0 0 45% 0; }
.panel { font-size: .95em; }
.ptabs { display: flex; gap: 1.6em; padding: .5em 1.2em .1em; font-size: .85em; letter-spacing: .04em; }
.ptabs span { padding-bottom: .45em; }
.ptabs em { font-style: normal; padding: 0 .45em; border-radius: 1em; margin-left: .3em; }
.term { padding: .5em 1.2em .9em; line-height: 1.6; white-space: nowrap; overflow: hidden; }
.block { display: inline-block; width: .6em; height: 1.1em; vertical-align: -0.2em; }
.status { display: flex; gap: 1.2em; align-items: center; height: 2.1em; padding-right: 1em; font-size: .88em; white-space: nowrap; }
.remote { height: 100%; display: grid; place-items: center; padding: 0 .9em; }
.grow { flex: 1; }

footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--rule); color: var(--muted); font-size: 13px; display: flex; flex-wrap: wrap; gap: 8px 24px; justify-content: space-between; }
footer code { font-family: var(--mono); font-size: 12px; color: var(--ink); }

@media (max-width: 900px) {
  .grid { grid-template-columns: minmax(0, 1fr); }
  header { grid-template-columns: 1fr; }
  .swatches { justify-items: start; }
  .sw-ui { justify-content: flex-start; }
}
@media (prefers-reduced-motion: reduce) { .win { transition: none; } .frame:hover .win { transform: none; } }
</style>

<div class="page">
  <header>
    <div>
      <h1>Four <em>Founders</em></h1>
      <p class="lede">Four founders, <strong>eight VS Code themes</strong>. Each house frames the window with its own banner color and a second highlight color. The code uses clearly separated colors, and the backgrounds stay soft: no pitch black, no paper white.</p>
    </div>
    <div class="filters" role="group" aria-label="Show variants">
      <button type="button" id="f-all" data-f="all" aria-pressed="true">All eight</button>
      <button type="button" id="f-dark" data-f="dark" aria-pressed="false">Dark</button>
      <button type="button" id="f-light" data-f="light" aria-pressed="false">Light</button>
    </div>
  </header>
  <ul class="principles">
    <li>Dark themes sit near #22–25, not #000</li>
    <li>Every code color passes WCAG AA (4.5:1)</li>
    <li>Only surfaces VS Code really lets a theme color</li>
    <li>Click any window to enlarge it</li>
  </ul>
  <main class="grid" id="grid">
    ${palettes.map(renderCard).join('')}
  </main>
  <footer>
    <span>Every color on this page comes from <code>src/palettes.js</code>, the same file that builds the themes.</span>
    <span>Unofficial fan work, inspired by the four houses. Not affiliated with any rights holder.</span>
  </footer>
</div>

<script>
(() => {
  const grid = document.getElementById('grid');
  const buttons = document.querySelectorAll('.filters button');
  const apply = (f) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === f)));
    grid.querySelectorAll('.card').forEach((c) => { c.hidden = f !== 'all' && c.dataset.type !== f; });
    try { localStorage.setItem('ff-filter', f); } catch (e) {}
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.f)));
  let saved = 'all';
  try { saved = localStorage.getItem('ff-filter') || 'all'; } catch (e) {}
  apply(saved);

  grid.addEventListener('click', (e) => {
    const frame = e.target.closest('.frame');
    if (!frame) return;
    const card = frame.closest('.card');
    const big = !card.classList.contains('big');
    grid.querySelectorAll('.card.big').forEach((c) => { c.classList.remove('big'); c.querySelector('.frame').setAttribute('aria-expanded', 'false'); });
    if (big) { card.classList.add('big'); frame.setAttribute('aria-expanded', 'true'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
})();
</script>
`;
}

module.exports = { renderPreview };
