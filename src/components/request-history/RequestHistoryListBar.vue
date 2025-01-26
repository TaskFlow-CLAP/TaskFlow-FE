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
import { useRequestParamsChange } from '../hooks/useRequestParamsChange'

const { params } = useRequestParamsStore()

const { toggleSortBy } = useRequestParamsChange()
</script>
