<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in REQUESTED_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sorted-by="tab.sortBy"
      @toggle-sort-by="toggleSortBy"
      :justify-center="tab.justifyCenter" />
  </div>
</template>

<script setup lang="ts">
import { useMyRequestParamsStore } from '@/stores/params'
import { REQUESTED_LIST_BAR_TAB } from '@/constants/user'
import ListBarTab from '../lists/ListBarTab.vue'

const { params } = useMyRequestParamsStore()

const toggleSortBy = (sortBy: 'REQUESTED' | 'FINISHED') => {
  if (sortBy === params.orderRequest.sortBy) {
    params.orderRequest.sortDirection =
      params.orderRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
  } else {
    params.orderRequest = { sortBy: sortBy, sortDirection: 'DESC' }
  }
}
</script>
