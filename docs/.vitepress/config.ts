import { defineConfig } from 'vitepress'
import startWatch from './watchReadme'
import taskListsMdPlugin from 'markdown-it-task-lists'
import baseViteConfig from '../../vite.config.base'

// copy 文档内容，并在文档修改时自动更新
startWatch()

export default defineConfig({
  title: 'moefy-canvas',
  description: '用可可爱爱的 canvas 动效装饰你的网页吧～',
  themeConfig: {
    // 由于目前文档内容是构建时 copy 过去的，所以无法通过配置 editLink 的方式来配置文档内容的编辑链接
    // editLink: {
    //   repo: 'moefyit/moefy-canvas',
    //   branch: 'main',
    //   dir: 'docs',
    //   text: 'Suggest changes to this page',
    // },

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
              text: 'metor',
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
