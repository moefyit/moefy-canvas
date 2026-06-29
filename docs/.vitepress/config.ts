import { defineConfig } from 'vitepress'
import taskListsMdPlugin from 'markdown-it-task-lists'
import baseViteConfig from '../../vite.config.base'

export default defineConfig({
  title: 'moefy-canvas',
  description: '用可可爱爱的 canvas 动效装饰你的网页吧～',
  themeConfig: {
    editLink: {
      pattern: ({ filePath }) => {
        const repoBase = 'https://github.com/moefyit/moefy-canvas/edit/main/'
        if (filePath.startsWith('themes/')) {
          if (filePath.endsWith('index.md')) {
            return `${repoBase}README.md`
          } else {
            const theme = filePath.split('/')[1].split('.')[0]
            return `${repoBase}packages/theme-${theme}/README.md`
          }
        } else {
          return `${repoBase}docs/${filePath}`
        }
      },
      text: 'Suggest changes to this page',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/moefyit/moefy-canvas' }],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Themes', link: '/themes/' },
    ],

    sidebar: {
      '/themes': [
        {
          text: '',
          items: [
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
            {
              text: 'meteor',
              link: '/themes/meteor.html',
            },
          ],
        },
      ],
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Nyakku Shigure',
    },
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
