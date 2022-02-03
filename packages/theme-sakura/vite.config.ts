import type { UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import baseConfig from '../../vite.config.base'

const config: UserConfig = {
  ...baseConfig,
  plugins: [dts()],
  build: {
    lib: {
      fileName: 'index',
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['ts-debounce', '@moefy-canvas/utils', '@moefy-canvas/core'],
    },
  },
}

export default config
