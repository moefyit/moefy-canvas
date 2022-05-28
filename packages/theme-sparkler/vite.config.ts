import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import baseConfig from '../../vite.config.base'

const dir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  ...baseConfig,
  plugins: [dts()],
  build: {
    lib: {
      fileName: 'index',
      entry: resolve(dir, './src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['color2k', 'ts-debounce', '@moefy-canvas/utils', '@moefy-canvas/core'],
    },
  },
})
