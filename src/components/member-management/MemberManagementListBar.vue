<template>
  <div class="list-bar">
    <ListBarTab
      v-for="tab in MEMBER_MANAGEMENT_LIST_BAR_TAB"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :sortBy="tab.sortBy"
      :current-order-request="orderRequest"
      :justify-center="tab.justifyCenter"
      @toggle-sort-by="toggleSortBy" />
  </div>
</template>

<script setup lang="ts">
import { MEMBER_MANAGEMENT_LIST_BAR_TAB } from '@/constants/admin'
import ListBarTab from '../lists/ListBarTab.vue'
import { useMemberManagementParamsStore } from '@/stores/params'
import { computed } from 'vue'

const { params } = useMemberManagementParamsStore()
const orderRequest = computed(() => ({
  sortBy: 'REGISTERED_AT',
  sortDirection: params.sortDirection
}))

const toggleSortBy = () => {
  params.sortDirection = params.sortDirection === 'DESC' ? 'ASC' : 'DESC'
}
</script>
