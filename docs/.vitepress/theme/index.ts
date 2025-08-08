// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import {h} from 'vue'
import './style/style.css'
import Confetti from './components/Confetti.vue'
import ArticleShare from './components/ArticleShare.vue'


export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            "aside-outline-before": () => h(ArticleShare),
        })
    },
    enhanceApp({app}) {
        app.component("Confetti", Confetti);
    }
}


