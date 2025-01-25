<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in REQUESTED_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sort-by="tab.sortBy"
      :current-order-request="params.orderRequest"
      @toggle-sort-by="toggleSortBy"
      :justify-center="tab.justifyCenter" />
  </div>
</template>

<script setup lang="ts">
import { REQUESTED_LIST_BAR_TAB } from '@/constants/user'
import ListBarTab from '../lists/ListBarTab.vue'
import { useRequestParamsStore } from '@/stores/params'

const { params } = useRequestParamsStore()

const toggleSortBy = () => {
  params.orderRequest.sortDirection = params.orderRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
}
</script>
