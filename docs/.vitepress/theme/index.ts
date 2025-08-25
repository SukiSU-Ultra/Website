// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import 'virtual:group-icons.css'
import {h} from 'vue'
import './style/style.css'
import Confetti from './components/Confetti.vue'
import ArticleShare from './components/ArticleShare.vue'
import backtotop from './components/backtotop.vue'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(ArticleShare),
      'doc-footer-before': () => h(backtotop),
    })
  },
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin);
    app.component('Confetti', Confetti)
  },
}


