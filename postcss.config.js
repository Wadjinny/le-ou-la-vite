import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default {
  plugins: [
    tailwindcss({
      base: rootDir,
      config: resolve(rootDir, 'tailwind.config.js'),
    }),
    autoprefixer(),
  ],
}

