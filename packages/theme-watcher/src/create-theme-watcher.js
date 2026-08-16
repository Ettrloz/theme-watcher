import {
  ATTR_THEME_WATCHER_ACTUAL,
  ATTR_THEME_WATCHER_STARTED,
  head,
  html,
  KEY_THEME
} from './constants';
import { insertMetaColorScheme, isStarted, matchDark, readConfig } from './utils';

/** @typedef {import('./types').Listener} Listener */
/** @typedef {import('./types').ThemeMode} ThemeMode */
/** @typedef {import('./types').ThemeModeActual} ThemeModeActual */
/** @typedef {import('./types').ThemeWatcherInstance} ThemeWatcherInstance */
/** @typedef {import('./types').ThemeWatcherOption} ThemeWatcherOption */

/**
 * Create theme watcher.
 *
 * @return {ThemeWatcherInstance}
 */
export function createThemeWatcher() {
  if (isStarted()) {
    throw new Error('Could cannot start theme watcher twice.');
  }

  /** @type {ThemeWatcherOption} */
  const config = {
    lightScheme: 'unset',
    darkScheme: 'unset'
  };

  /** @type {Listener} */
  const listener = new Map();

  let started = false;

  /** @type {ThemeMode} */
  let current = /** @type {any} */ (undefined);

  /** @type {ThemeModeActual} */
  let actual = /** @type {any} */ (undefined);

  /** @type {HTMLMetaElement} */
  let themeColor = /** @type {any} */ (undefined);

  function runListener() {
    for (const [_, fn] of listener) {
      fn(actual);
    }
  }

  function start() {
    started = true;

    html.setAttribute(ATTR_THEME_WATCHER_STARTED, '');

    insertMetaColorScheme();

    Object.assign(config, readConfig());

    themeColor = document.createElement('meta');
    themeColor.setAttribute('name', 'theme-color');

    head.appendChild(themeColor);

    let current = /** @type {ThemeMode} */ (window.localStorage.getItem(KEY_THEME));

    if (!current) {
      update('auto');
    } else {
      update(current);
    }

    matchDark().addEventListener('change', event => {
      update(current && current !== 'auto' ? (event.matches ? 'dark' : 'light') : 'auto');
    });
  }

  /**
   * @param {ThemeMode} value
   */
  function update(value) {
    if (!started) {
      throw new Error('Theme watcher not started yet, did you mean to call `.start()` first?');
    }

    if (!/light|dark|auto/.test(value)) {
      throw new Error(`Unexpected value '${value}', expected light, dark, auto`);
    }

    window.localStorage.setItem(KEY_THEME, value);

    const actualTheme = value !== 'auto' ? value : matchDark().matches ? 'dark' : 'light';

    current = value;
    actual = actualTheme;

    runListener();

    switch (actualTheme) {
      case 'light':
        html.classList.remove('dark');
        html.classList.add('light');

        themeColor.setAttribute('content', config.lightScheme);

        break;
      case 'dark':
        html.classList.remove('light');
        html.classList.add('dark');

        themeColor.setAttribute('content', config.darkScheme);

        break;
    }

    html.setAttribute(ATTR_THEME_WATCHER_ACTUAL, actual);
  }

  /**
   * @type {ThemeWatcherInstance['createListener']}
   */
  function createListener(name, fn, runImmediate) {
    listener.set(name, fn);

    if (runImmediate) {
      fn(actual);
    }
  }

  /**
   * @type {ThemeWatcherInstance['removeListener']}
   */
  function removeListener(name) {
    listener.delete(name);
  }

  return {
    start,
    update,
    createListener,
    removeListener,
    get actual() {
      return actual;
    },
    get current() {
      return current;
    },
    get started() {
      return started;
    }
  };
}
