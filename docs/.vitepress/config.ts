import { defineConfig } from 'vitepress'
import * as path from 'path'

export default defineConfig({
  title: 'moefy-canvas',
  description: 'xxx',
  themeConfig: {
    repo: 'moefyit/moefy-canvas',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
  },
  vite: {
    resolve: {
      alias: {
        '@moefy-canvas/utils': path.resolve(__dirname, '../../packages/utils/src/index.ts'),
        '@moefy-canvas/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
        '@moefy-canvas/theme-sparkler': path.resolve(
          __dirname,
          '../../packages/theme-sparkler/src/index.ts'
        ),
        '@moefy-canvas/theme-popper': path.resolve(
          __dirname,
          '../../packages/theme-popper/src/index.ts'
        ),
        '@moefy-canvas/theme-ribbon': path.resolve(
          __dirname,
          '../../packages/theme-ribbon/src/index.ts'
        ),
      },
    },
  },
})
