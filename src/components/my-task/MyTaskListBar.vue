<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in MY_TASK_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sortBy="tab.sortBy"
      :current-order-request="orderRequest"
      @toggle-sort-by="toggleSortBy" />
  </div>
</template>

<script setup lang="ts">
import ListBarTab from '../lists/ListBarTab.vue'
import { useRequestParamsStore } from '@/stores/params'
import { MY_TASK_LIST_BAR_TAB } from '@/constants/manager'
import { useRequestParamsChange } from '../hooks/useRequestParamsChange'
import { computed } from 'vue'

const { params } = useRequestParamsStore()
const orderRequest = computed(() => ({
  sortBy: params.sortBy,
  sortDirection: params.sortDirection
}))

const { toggleSortBy } = useRequestParamsChange()
</script>
