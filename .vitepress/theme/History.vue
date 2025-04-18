<template>
  <h4 v-if="visitHistory.length>0">阅读记录</h4>
  <ul :class="size.width.value>=500?'history-list':undefined">
    <li v-for="item in visitHistory">
      {{item.time.split('.')[0]}} <a :href="item.path"> {{ item.path }}</a>
    </li>
  </ul>
</template>

<script setup>
import { useLocalStorage, useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
const size = useWindowSize()
const visitHistoryJSON = useLocalStorage('visit-history')
const visitHistory = computed(() => JSON.parse(visitHistoryJSON.value || '[]').reverse())

</script>
<style scoped>

.history-list{
  display: flex;
  flex-direction: column;
  max-height: 200px;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
}
.history-list li{
  margin: 0;
  list-style: none; /* 去除项目符号 */
  padding: 0; /* 去除内边距 */
}
</style>