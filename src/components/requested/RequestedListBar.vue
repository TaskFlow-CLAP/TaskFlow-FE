<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in REQUESTED_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sort-by="tab.sortBy"
      :current-order-request="orderRequest"
      @toggle-sort-by="toggleSortBy"
      :justify-center="tab.justifyCenter" />
  </div>
</template>

<script setup lang="ts">
import { REQUESTED_LIST_BAR_TAB } from '@/constants/manager'
import ListBarTab from '../lists/ListBarTab.vue'
import { useRequestParamsStore } from '@/stores/params'
import { computed } from 'vue'
import { useRequestParamsChange } from '@/hooks/useRequestParamsChange'

const { params } = useRequestParamsStore()
const orderRequest = computed(() => ({
  sortBy: params.sortBy,
  sortDirection: params.sortDirection
}))

const { toggleSortBy } = useRequestParamsChange()
</script>
