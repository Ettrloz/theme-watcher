import { presetIcons, presetMini, presetWebFonts, type UserConfig } from 'unocss';

export default {
  presets: [
    presetMini(),
    presetIcons({
      iconifyCollectionsNames: ['@iconify-json']
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Open Sans'
      }
    })
  ]
} satisfies UserConfig;
