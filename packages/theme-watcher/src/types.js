/**
 * @typedef {Map<string, (actual: ThemeModeActual) => void>} Listener
 */

/**
 * @typedef {'light' | 'dark' | 'auto'} ThemeMode
 */

/**
 * @typedef {Exclude<ThemeMode, 'auto'>} ThemeModeActual
 */

/**
 * @typedef {Object} ThemeWatcherInstance
 * @property {boolean} started
 * @property {ThemeMode} current
 * @property {ThemeModeActual} actual
 * @property {() => void} start
 * @property {(value: ThemeMode) => void} update
 * @property {(name: string, fn: (actual: ThemeModeActual) => void, runImmediate?: boolean) => void} createListener
 * @property {(name: string) => void} removeListener
 */

/**
 * @typedef {Object} ThemeWatcherOption
 * @property {string} lightScheme
 * @property {string} darkScheme
 */

export {};
