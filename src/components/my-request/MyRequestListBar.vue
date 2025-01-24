<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in MY_REQUEST_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sortBy="tab.sortBy"
      :current-order-request="params.orderRequest"
      @toggle-sort-by="toggleSortBy" />
  </div>
</template>

<script setup lang="ts">
import { useMyRequestParamsStore } from '@/stores/params'
import { MY_REQUEST_LIST_BAR_TAB } from '@/constants/user'
import ListBarTab from '../lists/ListBarTab.vue'

const { params } = useMyRequestParamsStore()

const toggleSortBy = (sortBy: 'REQUESTED' | 'FINISHED') => {
  if (sortBy === params.orderRequest.sortBy) {
    params.orderRequest.sortDirection =
      params.orderRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
  } else {
    params.orderRequest = { sortBy, sortDirection: 'DESC' }
  }
}
</script>
