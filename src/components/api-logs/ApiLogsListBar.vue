<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in LOGS_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sortBy="tab.sortBy"
      :current-order-request="params.orderRequest"
      @toggle-sort-by="toggleSortBy" />
  </div>
</template>

<script setup lang="ts">
import { useLogsParamsStore } from '@/stores/params'
import ListBarTab from '../lists/ListBarTab.vue'
import { LOGS_LIST_BAR_TAB } from '@/constants/admin'
import { useLogsParamsChange } from '../hooks/useLogsParamsChange'

const { params } = useLogsParamsStore()

const { toggleSortBy } = useLogsParamsChange()
</script>
