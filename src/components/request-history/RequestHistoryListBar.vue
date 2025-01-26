<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in REQUEST_HISTORY_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sortBy="tab.sortBy"
      :current-order-request="params.orderRequest"
      @toggle-sort-by="toggleSortBy" />
  </div>
</template>

<script setup lang="ts">
import ListBarTab from '../lists/ListBarTab.vue'
import { useRequestParamsStore } from '@/stores/params'
import { REQUEST_HISTORY_LIST_BAR_TAB } from '@/constants/manager'

const { params } = useRequestParamsStore()

const toggleSortBy = (sortBy: 'REQUESTED' | 'FINISHED') => {
  if (sortBy === params.orderRequest.sortBy) {
    params.orderRequest.sortDirection =
      params.orderRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
  } else {
    params.orderRequest = { sortBy, sortDirection: 'DESC' }
  }
}
</script>
