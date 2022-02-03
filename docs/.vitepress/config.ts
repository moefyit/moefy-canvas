import { defineConfig } from 'vitepress'
import startWatch from './watchReadme'
import taskListsMdPlugin from 'markdown-it-task-lists'
import baseViteConfig from '../../vite.config.base'

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
    ...baseViteConfig,
  },
})
