import { defineConfig } from 'vitepress'
import * as path from 'path'
import startWatch from './watchReadme'
import taskListsMdPlugin from 'markdown-it-task-lists'

startWatch()

export default defineConfig({
  title: 'moefy-canvas',
  description: '用可可爱爱的 canvas 动效装饰你的网页吧～',
  base: '/moefy-canvas/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Themes', link: '/themes/' },
    ],
    sidebar: {
      '/themes': [
        {
          text: '开始～',
          link: '/themes/',
        },
        {
          text: 'sparkler',
          link: '/themes/sparkler.html',
        },
        {
          text: 'popper',
          link: '/themes/popper.html',
        },
        {
          text: 'ribbon',
          link: '/themes/ribbon.html',
        },
        {
          text: 'sakura',
          link: '/themes/sakura.html',
        },
      ],
    },
    repo: 'moefyit/moefy-canvas',
    docsDir: 'docs',
    docsBranch: 'main',
  },

  markdown: {
    config(md) {
      md.use(taskListsMdPlugin)
    },
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
        '@moefy-canvas/theme-sakura': path.resolve(
          __dirname,
          '../../packages/theme-sakura/src/index.ts'
        ),
      },
    },
  },
})
