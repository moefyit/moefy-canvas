import { App, h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import GitHubLink from './components/GitHubLink.vue'
import Sparkler from './components/Sparkler.vue'
import Sakura from './components/Sakura.vue'
import Popper from './components/Popper.vue'
import Ribbon from './components/Ribbon.vue'
import HomeExtraContents from './components/HomeExtraContents.vue'
import HideInDoc from './components/HideInDoc.vue'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('GitHubLink', GitHubLink)
    app.component('Sparkler', Sparkler)
    app.component('Sakura', Sakura)
    app.component('Popper', Popper)
    app.component('Ribbon', Ribbon)
    app.component('HideInDoc', HideInDoc)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(HomeExtraContents),
    })
  },
}
