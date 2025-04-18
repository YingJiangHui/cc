import DefaultTheme from 'vitepress/theme'
import "./custom.css"
import { h } from 'vue'

import {
  Announcement,
  DocAsideLogo,
  DocBox,
  DocBoxCube,
  DocLinks,
  DocPill,
  HomeFooter,
  HomeUnderline,
  ShareButton,
  Twikoo,
  googleAnalytics,
  umamiAnalytics
} from '@theojs/lumen'
import '@theojs/lumen/theme'
import Layout from './Layout.vue'
import History from './History.vue'

import { Aside_Data, Footer_Data, Twikoo_Data } from '../data'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(Layout, null, {
      // 'aside-ads-before': () => h(DocAsideLogo, { Aside_Data }),
      'aside-outline-after': () => h(ShareButton),
      // 'home-hero-info-before': () => h(Announcement),
      'layout-bottom': () => h(HomeFooter, { Footer_Data })
    })
  },
  enhanceApp: ({ app, router }) => {
    // googleAnalytics({ id: 'G-5SHLV23EGQ' })
    // umamiAnalytics({
    //   id: '3c2b0a9b-996b-4885-810a-f7145b9ef16f',
    //   src: 'https://umami.theojs.cn/script.js'
    // })
    app.component('Home', HomeUnderline)
    app.component('Pill', DocPill)
    app.component('Box', DocBox)
    app.component('Links', DocLinks)
    app.component('BoxCube', DocBoxCube)
    app.component('Layout', DefaultTheme.Layout)
    app.component('History', History)
    // app.component('RouterLink', RouterLink)

    if (typeof window !== 'undefined') {
      // 初始化访问历史
      const VISIT_KEY = 'vp_visit_history'
      let history = JSON.parse(localStorage.getItem(VISIT_KEY) || '[]')
      console.log(router,')))',router.onAfterRouteChanged)
      // 监听路由变化
      // router.onAfterRouteChanged = (to) => {
      //   console.log(history,'history')
      //   if (!history.includes(to)) {
      //     history.unshift(to)  // 添加到数组开头
      //     history = history.slice(0, 10)  // 只保留最近10条
      //     localStorage.setItem(VISIT_KEY, JSON.stringify(history))
      //   }
      // }
    }
  }
}
