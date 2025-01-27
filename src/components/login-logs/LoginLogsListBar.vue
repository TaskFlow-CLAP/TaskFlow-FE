<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in LOGIN_LOGS_LIST_BAR_TAB"
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
import { useRequestParamsChange } from '../hooks/useRequestParamsChange'
import { LOGIN_LOGS_LIST_BAR_TAB } from '@/constants/admin'

const { params } = useRequestParamsStore()

const { toggleSortBy } = useRequestParamsChange()
</script>
