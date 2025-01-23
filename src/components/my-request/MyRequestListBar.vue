<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in MY_REQUEST_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :order="tab.key && order[tab.key]"
      @toggle-order="tab.key && toggleOrder(tab.key)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ListBarTab from '../ListBarTab.vue'
import { MY_REQUEST_LIST_BAR_TAB } from '@/constants/user'

const order = ref<{ requestedAt: 'DESC' | 'ASC'; finishedAt: 'DESC' | 'ASC' }>({
  requestedAt: 'DESC',
  finishedAt: 'DESC'
})

const toggleOrder = (key: 'requestedAt' | 'finishedAt') => {
  if (order.value[key] === 'DESC') {
    order.value[key] = 'ASC'
  } else {
    order.value[key] = 'DESC'
  }
}
</script>
