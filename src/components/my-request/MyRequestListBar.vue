<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in MY_REQUEST_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :order-target="tab.target"
      @toggle-order="toggleOrder" />
  </div>
</template>

<script setup lang="ts">
import { useMyRequestParamsStore } from '@/stores/params'
import ListBarTab from '../ListBarTab.vue'
import { MY_REQUEST_LIST_BAR_TAB } from '@/constants/user'

const { params } = useMyRequestParamsStore()

const toggleOrder = (orderTarget: string) => {
  if (orderTarget === params.order.target) {
    params.order.type = params.order.type === 'DESC' ? 'ASC' : 'DESC'
  } else {
    params.order = { target: orderTarget, type: 'DESC' }
  }
}
</script>
