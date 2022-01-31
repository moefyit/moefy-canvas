import type { UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'

const config: UserConfig = {
  plugins: [dts()],
  build: {
    lib: {
      fileName: 'index',
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
    },
  },
}

export default config
