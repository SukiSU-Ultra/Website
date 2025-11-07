// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import 'virtual:group-icons.css'
import {h} from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import './style/style.css'
import LandingHero from './components/LandingHero.vue'
import LandingFeatures from './components/LandingFeatures.vue'
import LandingShowcase from './components/LandingShowcase.vue'
import LandingPage from './components/LandingPage.vue'
import ArticleShare from './components/ArticleShare.vue'
import "@catppuccin/vitepress/theme/frappe/teal.css"

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
  'aside-outline-before': () => h(ArticleShare),
    })
  },
  enhanceApp({ app }) {
    app.component('LandingHero', LandingHero)
    app.component('LandingFeatures', LandingFeatures)
    app.component('LandingShowcase', LandingShowcase)
    app.component('LandingPage', LandingPage)
    app.component('IconifyIcon', IconifyIcon)

  },
}

export default theme


