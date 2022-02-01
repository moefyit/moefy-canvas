import { defineConfig } from 'vitepress'
import * as path from 'path'
import startWatch from './watchReadme'

startWatch()

export default defineConfig({
  title: 'moefy-canvas',
  description: 'xxx',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/packages' },
    ],
    sidebar: {
      '/packages': [
        {
          text: '开始～',
          link: '/packages/',
        },
        {
          text: 'sparkler',
          link: '/packages/sparkler.html',
        },
        {
          text: 'popper',
          link: '/packages/popper.html',
        },
        {
          text: 'ribbon',
          link: '/packages/ribbon.html',
        },
      ],
    },
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
