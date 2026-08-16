import { createThemeWatcher } from '../create-theme-watcher';

const watcher = createThemeWatcher();

watcher.start();

/** @type {any} */ (window).themeWatcher = watcher;
