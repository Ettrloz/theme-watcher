import unocss from 'unocss/vite';
import type { UserConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default {
  base: '/theme-watcher',
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules/,
              maxSize: 240000
            }
          ]
        }
      }
    }
  },
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    unocss(),
    ViteMinifyPlugin({
      collapseAttributeWhitespace: true,
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      sortAttributes: true,
      sortClassNames: true
    })
  ]
} satisfies UserConfig;
