import { defineConfig } from 'vite'
// @ts-ignore
import tailwindcss from 'tailwindcss'
// @ts-ignore
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
}) 