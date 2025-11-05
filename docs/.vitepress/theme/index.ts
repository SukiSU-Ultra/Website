// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import 'virtual:group-icons.css'
import {h} from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import './style/style.css'
import LandingHero from './components/LandingHero.vue'
import LandingFeatures from './components/LandingFeatures.vue'
import LandingShowcase from './components/LandingShowcase.vue'
import LandingPage from './components/LandingPage.vue'
import ArticleShare from './components/ArticleShare.vue'
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
  'aside-outline-before': () => h(ArticleShare),
    })
  },
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin);
    app.component('LandingHero', LandingHero)
    app.component('LandingFeatures', LandingFeatures)
    app.component('LandingShowcase', LandingShowcase)
    app.component('LandingPage', LandingPage)
    app.component('IconifyIcon', IconifyIcon)

  },
}

export default theme


