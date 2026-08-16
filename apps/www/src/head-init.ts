import persist from '@alpinejs/persist';
import Alpine from 'alpinejs';
import tippy from 'tippy.js';
import '@ettrloz/theme-watcher/browser';
import 'tippy.js/dist/tippy.css';

Alpine.plugin(persist);
Alpine.start();

(window as any).Alpine = Alpine;

tippy('[data-tippy-content]');
