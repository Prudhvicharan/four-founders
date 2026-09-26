'use strict';

/**
 * The single source of truth for every Four Founders theme.
 *
 * ui          workbench surfaces
 *   deep      activity bar
 *   side      sidebar, panel, inactive tabs
 *   bg        editor
 *   lift      current line (a hair away from bg)
 *   raised    floating widgets: suggest, hover, command palette
 *   banner    title bar + status bar — the house colours framing the window
 *   onBanner  text on the banner
 *   highlight solid selection for lists and pickers — the house's second colour
 *   accent    focus, active tab, active icon border
 *   accent2   cursor, active line number, active icon
 * syntax      code colours: clearly separated hues, never neon
 * ansi        terminal colours (brights are derived)
 */

const statusDark = {
  error: '#F07A72',
  warning: '#E8B45A',
  info: '#7FB2F0',
  added: '#8CCB7A',
  modified: '#7FB2F0',
  deleted: '#F07A72',
};

const statusLight = {
  error: '#B83A34',
  warning: '#9A6400',
  info: '#2F66B0',
  added: '#3F7F28',
  modified: '#2F66B0',
  deleted: '#B83A34',
};

module.exports = [
  // ─────────────────────────────── LION ───────────────────────────────
  {
    id: 'godric-dark',
    house: 'Godric',
    inspiredBy: 'Gryffindor',
    name: 'Four Founders Godric Dark',
    type: 'dark',
    mood: 'Wine banner, gold highlights, warm graphite',
    ui: {
      deep: '#1C1918', side: '#211E1C', bg: '#262220', lift: '#2F2A27', raised: '#2C2724',
      border: '#3A332F', fg: '#E8DFD3', fgMuted: '#A89C90', fgSubtle: '#7A6F66',
      banner: '#5C262C', onBanner: '#F0D39A', highlight: '#4A3B24',
      accent: '#D0646C', accent2: '#E0B55E', button: '#A8424B', onButton: '#FBF1E8',
    },
    status: statusDark,
    syntax: {
      comment: '#877B71', keyword: '#F0707A', func: '#F2C45A', type: '#7FCBE0', string: '#B5D77A',
      number: '#C79BF2', constant: '#C79BF2', variable: '#E8DFD3', property: '#E3CFB4', param: '#F5A35C',
      operator: '#F0707A', punct: '#A39688', tag: '#F0707A', attr: '#F2C45A', regex: '#7FDBC0',
      escape: '#F5A35C', heading: '#F0707A', link: '#7FCBE0',
    },
    ansi: {
      black: '#3A3430', red: '#F0707A', green: '#B5D77A', yellow: '#F2C45A',
      blue: '#7FB2F0', magenta: '#C79BF2', cyan: '#7FCBE0', white: '#E8DFD3',
    },
  },
  {
    id: 'godric-light',
    house: 'Godric',
    inspiredBy: 'Gryffindor',
    name: 'Four Founders Godric Light',
    type: 'light',
    mood: 'Rose-wine banner, gold highlights, warm ivory',
    ui: {
      deep: '#F3ECE3', side: '#F3ECE3', bg: '#FBF7F2', lift: '#F5EFE7', raised: '#FEFBF7',
      border: '#E4D9CB', fg: '#3A2E2C', fgMuted: '#6E605A', fgSubtle: '#86786F',
      banner: '#CF8C90', onBanner: '#3A1D21', highlight: '#EEDCB0',
      accent: '#A8424B', accent2: '#936F1C', button: '#A8424B', onButton: '#FFF8F2',
    },
    status: statusLight,
    syntax: {
      comment: '#92867D', keyword: '#B3313F', func: '#2F6AB0', type: '#8250B5', string: '#3F7A26',
      number: '#AF5212', constant: '#AF5212', variable: '#3A2E2C', property: '#6B4A3A', param: '#8F6300',
      operator: '#B3313F', punct: '#857870', tag: '#B3313F', attr: '#8F6300', regex: '#21796D',
      escape: '#AF5212', heading: '#B3313F', link: '#2F6AB0',
    },
    ansi: {
      black: '#3A2E2C', red: '#B3313F', green: '#3F7A26', yellow: '#8F6300',
      blue: '#2F6AB0', magenta: '#8250B5', cyan: '#21796D', white: '#D8CDBB',
    },
  },

  // ────────────────────────────── SERPENT ─────────────────────────────
  {
    id: 'salazar-dark',
    house: 'Salazar',
    inspiredBy: 'Slytherin',
    name: 'Four Founders Salazar Dark',
    type: 'dark',
    mood: 'Deep emerald banner, silver highlights, green-charcoal',
    ui: {
      deep: '#171C1A', side: '#1B211F', bg: '#202725', lift: '#28302D', raised: '#252C2A',
      border: '#2F3935', fg: '#DDE6E1', fgMuted: '#9AA9A2', fgSubtle: '#69776F',
      banner: '#1D4636', onBanner: '#CFE0D8', highlight: '#37423F',
      accent: '#5ED3A1', accent2: '#B8C6C0', button: '#2F7D5C', onButton: '#F0F8F4',
    },
    status: statusDark,
    syntax: {
      comment: '#75857D', keyword: '#5ED3A1', func: '#7EC8F2', type: '#B9A4F5', string: '#E6D07A',
      number: '#F4987F', constant: '#F4987F', variable: '#DDE6E1', property: '#C4DCD1', param: '#F2B872',
      operator: '#5ED3A1', punct: '#8A9A92', tag: '#5ED3A1', attr: '#E6D07A', regex: '#F28FB0',
      escape: '#F2B872', heading: '#5ED3A1', link: '#7EC8F2',
    },
    ansi: {
      black: '#34403B', red: '#F4987F', green: '#5ED3A1', yellow: '#E6D07A',
      blue: '#7EC8F2', magenta: '#B9A4F5', cyan: '#7FDBC8', white: '#DDE6E1',
    },
  },
  {
    id: 'salazar-light',
    house: 'Salazar',
    inspiredBy: 'Slytherin',
    name: 'Four Founders Salazar Light',
    type: 'light',
    mood: 'Sage banner, silver highlights, mint-white',
    ui: {
      deep: '#ECF2EE', side: '#ECF2EE', bg: '#F7FAF8', lift: '#EEF3EF', raised: '#FCFEFC',
      border: '#D6E0DA', fg: '#22302A', fgMuted: '#54645C', fgSubtle: '#6F7F77',
      banner: '#93C4A8', onBanner: '#10301F', highlight: '#D9E0DF',
      accent: '#2B7A57', accent2: '#5F6E73', button: '#2B7A57', onButton: '#F4FAF6',
    },
    status: statusLight,
    syntax: {
      comment: '#7F8C85', keyword: '#1D7A52', func: '#2C63B0', type: '#7A4FB5', string: '#8F6300',
      number: '#BB492A', constant: '#BB492A', variable: '#22302A', property: '#3F5A50', param: '#A0457A',
      operator: '#1D7A52', punct: '#74837C', tag: '#1D7A52', attr: '#8F6300', regex: '#B0426A',
      escape: '#8F6300', heading: '#1D7A52', link: '#2C63B0',
    },
    ansi: {
      black: '#22302A', red: '#BB492A', green: '#1D7A52', yellow: '#8F6300',
      blue: '#2C63B0', magenta: '#7A4FB5', cyan: '#12737A', white: '#CBD5CE',
    },
  },

  // ─────────────────────────────── RAVEN ──────────────────────────────
  {
    id: 'rowena-dark',
    house: 'Rowena',
    inspiredBy: 'Rowenaclaw',
    name: 'Four Founders Rowena Dark',
    type: 'dark',
    mood: 'Midnight sapphire banner, bronze highlights, blue-charcoal',
    ui: {
      deep: '#181B20', side: '#1C2026', bg: '#21252C', lift: '#2A2F37', raised: '#262B33',
      border: '#323843', fg: '#DEE3EC', fgMuted: '#9DA6B6', fgSubtle: '#6B7483',
      banner: '#22375C', onBanner: '#EBC89C', highlight: '#46392B',
      accent: '#7FA8FF', accent2: '#EBA46F', button: '#3D63A8', onButton: '#F2F6FD',
    },
    status: statusDark,
    syntax: {
      comment: '#78818F', keyword: '#7FA8FF', func: '#6FD6E6', type: '#EBA46F', string: '#A9D98C',
      number: '#D59CF5', constant: '#D59CF5', variable: '#DEE3EC', property: '#C3D0E6', param: '#E7A6C8',
      operator: '#7FA8FF', punct: '#8E97A6', tag: '#7FA8FF', attr: '#EBA46F', regex: '#E8C27C',
      escape: '#EBA46F', heading: '#7FA8FF', link: '#6FD6E6',
    },
    ansi: {
      black: '#353A44', red: '#F07A72', green: '#A9D98C', yellow: '#E8C27C',
      blue: '#7FA8FF', magenta: '#D59CF5', cyan: '#6FD6E6', white: '#DEE3EC',
    },
  },
  {
    id: 'rowena-light',
    house: 'Rowena',
    inspiredBy: 'Rowenaclaw',
    name: 'Four Founders Rowena Light',
    type: 'light',
    mood: 'Periwinkle banner, bronze highlights, cool white',
    ui: {
      deep: '#EDF0F6', side: '#EDF0F6', bg: '#F8F9FC', lift: '#EFF2F8', raised: '#FCFDFF',
      border: '#D5DBE7', fg: '#222B3C', fgMuted: '#525D72', fgSubtle: '#6E798D',
      banner: '#9DB5E0', onBanner: '#13223F', highlight: '#F0DCC4',
      accent: '#3861B5', accent2: '#935E22', button: '#3861B5', onButton: '#F5F8FE',
    },
    status: statusLight,
    syntax: {
      comment: '#808A9B', keyword: '#2F5FC4', func: '#0E7580', type: '#A0561A', string: '#3D7C27',
      number: '#B5375C', constant: '#7A4FB5', variable: '#222B3C', property: '#3F4E6B', param: '#8F6300',
      operator: '#2F5FC4', punct: '#737E92', tag: '#2F5FC4', attr: '#A0561A', regex: '#7A4FB5',
      escape: '#A0561A', heading: '#2F5FC4', link: '#0E7580',
    },
    ansi: {
      black: '#222B3C', red: '#B5375C', green: '#3D7C27', yellow: '#8F6300',
      blue: '#2F5FC4', magenta: '#7A4FB5', cyan: '#0E7580', white: '#CFD5DE',
    },
  },

  // ────────────────────────────── BADGER ──────────────────────────────
  {
    id: 'helga-dark',
    house: 'Helga',
    inspiredBy: 'Hufflepuff',
    name: 'Four Founders Helga Dark',
    type: 'dark',
    mood: 'Honey banner, black type, warm charcoal',
    ui: {
      deep: '#1A1917', side: '#1F1D1B', bg: '#252320', lift: '#2E2B28', raised: '#2A2825',
      border: '#37332E', fg: '#E6DFD2', fgMuted: '#A69E90', fgSubtle: '#776F64',
      banner: '#CFA64C', onBanner: '#1C1A16', highlight: '#46391E',
      accent: '#F5C04E', accent2: '#EDE0C0', button: '#CFA64C', onButton: '#1C1A16',
    },
    status: statusDark,
    syntax: {
      comment: '#857D71', keyword: '#F5C04E', func: '#7CC7F2', type: '#C9A0F0', string: '#A8D67E',
      number: '#F28C6E', constant: '#F28C6E', variable: '#E6DFD2', property: '#E6D8BE', param: '#8FDCCB',
      operator: '#F5C04E', punct: '#9A9184', tag: '#F5C04E', attr: '#7CC7F2', regex: '#F2A0C0',
      escape: '#F28C6E', heading: '#F5C04E', link: '#7CC7F2',
    },
    ansi: {
      black: '#3A3733', red: '#F28C6E', green: '#A8D67E', yellow: '#F5C04E',
      blue: '#7CC7F2', magenta: '#C9A0F0', cyan: '#8FDCCB', white: '#E6DFD2',
    },
  },
  {
    id: 'helga-light',
    house: 'Helga',
    inspiredBy: 'Hufflepuff',
    name: 'Four Founders Helga Light',
    type: 'light',
    mood: 'Sunflower banner, black accents, creamy white',
    ui: {
      deep: '#F4F0E2', side: '#F4F0E2', bg: '#FBF9F1', lift: '#F4F0E3', raised: '#FEFCF6',
      border: '#E3DCC8', fg: '#2F2B25', fgMuted: '#625A4E', fgSubtle: '#7F7668',
      banner: '#E8C25A', onBanner: '#2A2418', highlight: '#DEDACD',
      accent: '#3A342C', accent2: '#946600', button: '#2F2B25', onButton: '#F3D173',
    },
    status: statusLight,
    syntax: {
      comment: '#918778', keyword: '#986101', func: '#2B67AC', type: '#AE3F66', string: '#44791F',
      number: '#B34E19', constant: '#7A4FB5', variable: '#2F2B25', property: '#5A4E40', param: '#12777E',
      operator: '#986101', punct: '#7F7668', tag: '#986101', attr: '#2B67AC', regex: '#12777E',
      escape: '#B34E19', heading: '#986101', link: '#2B67AC',
    },
    ansi: {
      black: '#2F2B25', red: '#B83A34', green: '#44791F', yellow: '#986101',
      blue: '#2B67AC', magenta: '#7A4FB5', cyan: '#12777E', white: '#D9CFBC',
    },
  },
];
