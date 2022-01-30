import type { UserConfig } from 'vite'
import * as path from 'path'

const config: UserConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['@moefy-canvas/core'],
    },
  },
  resolve: {
    alias: {
      '@moefy-canvas/core': path.resolve(__dirname, '../core/src/index.ts'),
    },
  },
}

export default config
