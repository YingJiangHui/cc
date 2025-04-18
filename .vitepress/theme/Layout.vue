<template>
  <Layout>
    <template v-slot:layout-bottom>
      <slot name="layout-bottom" />
    </template>

    <template #page-top>
      <slot name="page-top" />
    </template>
    <template #page-bottom>
      <slot name="page-bottom" />
    </template>

    <template #not-found>
      <slot name="not-found" />
    </template>
    <template #home-hero-before>
      <slot name="home-hero-before" />
    </template>
    <template #home-hero-info-before>
      <slot name="home-hero-info-before" />
    </template>
    <template #home-hero-info>
      <slot name="home-hero-info" />
    </template>
    <template #home-hero-info-after>
      <slot name="home-hero-info-after" />
    </template>
    <template #home-hero-actions-after>
      <slot name="home-hero-actions-after" />
    </template>
    <template #home-hero-image>
      <slot name="home-hero-image" />
    </template>
    <template #home-hero-after>
      <slot name="home-hero-after" />
    </template>
    <template #home-features-before>
      <slot name="home-features-before" />
    </template>
    <template #home-features-after>
      <slot name="home-features-after" />
    </template>

    <template #doc-footer-before>
      <slot name="doc-footer-before" />
    </template>
    <template #doc-before>
      <slot name="doc-before" />
    </template>
    <template #doc-after>
      <slot name="doc-after" />
    </template>
    <template #doc-top>
      <slot name="doc-top" />
    </template>
    <template #doc-bottom>
      <slot name="doc-bottom" />
    </template>

    <template #aside-top>
      <slot name="aside-top" />
    </template>
    <template #aside-bottom>
      <slot name="aside-bottom" />
    </template>
    <template #aside-outline-before>
      <slot name="aside-outline-before" />
    </template>
    <template #aside-outline-after>
      <slot name="aside-outline-after" />
    </template>
    <template #aside-ads-before>
      <slot name="aside-ads-before" />
    </template>
    <template #aside-ads-after>
      <slot name="aside-ads-after" />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
import { watch, nextTick, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vitepress'
import { useLocalStorage, useDebounceFn, useWindowScroll, useTimeout } from '@vueuse/core'

const { route } = useRouter() // 页面路由对象
const visitHistoryJSON = useLocalStorage('visit-history')
const browseProgressMapJSON = useLocalStorage('browse-progress-map')
const browseProgressMap = computed(() => JSON.parse(browseProgressMapJSON.value || '{}'))
const maxHistory = import.meta.env.MAX_HISTORY_COUNT || 20
const scrollDebounce = useDebounceFn((e) => {
  const oldBrowseProgressMap = JSON.parse(browseProgressMapJSON.value || '{}')
  Object.assign(oldBrowseProgressMap, { [decodeURIComponent(route.path)]: e.target.documentElement.scrollTop })
  browseProgressMapJSON.value = JSON.stringify(oldBrowseProgressMap)
}, 500)
const scroll = useWindowScroll({
  behavior: 'smooth',
  onScroll: (e) => {
    scrollDebounce(e)
  }
})


onMounted(() => {
  let timer = 0
  watch(
    () => route.path, // 监听路由变化，重新挂载评论组件
    () => {
      const path = decodeURIComponent(route.path)
      clearTimeout(timer)
      timer = setTimeout(() => {

        const oldHistory = JSON.parse(visitHistoryJSON.value || '[]')
        // 上次访问的是相同页面 或者是根目录
        if (oldHistory[oldHistory.length - 1]?.path === path || path === '/') {
          return
        }
        // 限制最多数量
        const divide = oldHistory.length + 1 - maxHistory
        visitHistoryJSON.value = JSON.stringify((oldHistory).concat({
          path: decodeURIComponent(route.path),
          time: new Date().toISOString()
        }).slice(divide < 0 ? 0 : divide))

      }, 5000)
      nextTick(() => {
        scroll.y.value = browseProgressMap.value[path] || 0
      })
    },
    { immediate: true }
  )
})
</script>