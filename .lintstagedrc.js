module.exports = {
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,html}': ['npx oxlint', 'npx oxfmt --write'],
  '*/package.json': ['npx oxfmt --write']
};
