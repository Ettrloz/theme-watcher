import path from 'node:path';
import { defineConfig } from 'rolldown';
import { globSync } from 'tinyglobby';

const input = Object.fromEntries(
  globSync('src/*.js').map(file => [
    path
      .relative('src', file.slice(0, file.length - path.extname(file).length))
      .split(path.sep)
      .join('/'),
    path.resolve(file)
  ])
);

export default defineConfig([
  {
    input,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      sourcemap: true,
      entryFileNames: '[name].mjs'
    }
  },
  {
    input,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      sourcemap: true,
      entryFileNames: '[name].cjs'
    }
  }
]);
