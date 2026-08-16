import {
  ATTR_THEME_WATCHER_CONFIG,
  ATTR_THEME_WATCHER_STARTED,
  head,
  html,
  MEDIA_DARK
} from './constants';

/** @typedef {import('./types').ThemeWatcherOption} ThemeWatcherOption */

/**
 * Check whether tag `<meta name="color-scheme" content="...">` exist in head.
 */
export function isMetaColorSchemeExist() {
  const elements = [...head.querySelectorAll('meta[name="color-scheme"]')];

  return elements.length > 0 && elements.every(element => element.hasAttribute('content'));
}

/**
 * Insert meta color scheme to head if does not exist.
 */
export function insertMetaColorScheme() {
  if (isMetaColorSchemeExist()) {
    return;
  }

  const meta = document.createElement('meta');

  meta.setAttribute('name', 'color-scheme');
  meta.setAttribute('content', 'light dark');

  head.appendChild(meta);
}

/**
 * Check whether theme watcher has been started.
 */
export function isStarted() {
  return html.hasAttribute(ATTR_THEME_WATCHER_STARTED);
}

/**
 * Read config from specified data attribute if present.
 *
 * @return {Partial<ThemeWatcherOption>}
 */
export function readConfig() {
  if (!html.hasAttribute(ATTR_THEME_WATCHER_CONFIG)) {
    return {};
  }

  const content = /** @type {string} */ (html.getAttribute(ATTR_THEME_WATCHER_CONFIG));

  try {
    const parsed = JSON.parse(content);

    return parsed;
  } catch (error) {
    console.error(error);

    return {};
  }
}

/** @internal */
export const matchDark = () => window.matchMedia(MEDIA_DARK);
