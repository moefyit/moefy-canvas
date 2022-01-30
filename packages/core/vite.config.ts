import type { UserConfig } from 'vite'
import * as path from 'path'

const config: UserConfig = {
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
    },
  },
}

export default config
