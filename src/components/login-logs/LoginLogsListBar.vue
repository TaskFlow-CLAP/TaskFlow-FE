<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in LOGS_LIST_BAR_TAB"
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
import { useLogsParamsStore } from '@/stores/params'
import { LOGS_LIST_BAR_TAB } from '@/constants/admin'
import { useLogsParamsChange } from '../hooks/useLogsParamsChange'
import { computed } from 'vue'

const { params } = useLogsParamsStore()
const orderRequest = computed(() => ({
  sortBy: params.sortBy,
  sortDirection: params.sortDirection
}))

const { toggleSortBy } = useLogsParamsChange()
</script>
