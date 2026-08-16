import hljs from 'highlight.js';

(window as any).themeWatcher.createListener(
  'hljs',
  (actual: string) => {
    if (actual === 'dark') {
      import('highlight.js/styles/atom-one-dark.css?inline').then(({ default: style }) => {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(style);

        document.adoptedStyleSheets = [sheet];
      });
    } else {
      import('highlight.js/styles/atom-one-light.css?inline').then(({ default: style }) => {
        const sheet = new CSSStyleSheet();

        sheet.replaceSync(style);

        document.adoptedStyleSheets = [sheet];
      });
    }
  },
  true
);

hljs.configure({
  languages: ['xml']
});
hljs.highlightAll();
