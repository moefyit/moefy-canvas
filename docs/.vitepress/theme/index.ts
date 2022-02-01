import { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PageOnly from './components/PageOnly.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.provide('PageOnly', PageOnly)
  },
}
