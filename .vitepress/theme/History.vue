<template>
  <h4>历史记录</h4>
  <ul :class="innerWidth>=500?'history-list':undefined">
    <li v-for="item in visitHistory">
      {{dayjs(item.time).format("YYYY/MM/DD HH:mm")}} <a :href="item.path"> {{ item.path }}</a>
    </li>
  </ul>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import dayjs from 'dayjs'
const innerWidth = window.innerWidth
const visitHistoryJSON = useLocalStorage('visit-history')
const visitHistory = computed(() => JSON.parse(visitHistoryJSON.value || '[]').reverse())

</script>
<style scoped>

.history-list{
  display: flex;
  flex-direction: column;
  max-height: 200px;
  flex-wrap: wrap;

}
.history-list li{
  margin-top: 6px;
}
</style>