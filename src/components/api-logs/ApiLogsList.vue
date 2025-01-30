<template>
  <ListContainer>
    <template #listBar>
      <ApiLogsListBar />
    </template>

    <template #listCards>
      <ApiLogsListCard
        v-for="info in DUMMY_API_LOGS_LIST_DATA"
        :key="info.logId"
        :info="info" />
    </template>

    <template #pagination>
      <ListPagination
        :page-number="params.page"
        :total-page="DUMMY_TOTAL_PAGE"
        @update:page-number="onPageChange" />
    </template>
  </ListContainer>
</template>

<script setup lang="ts">
import ListPagination from '../lists/ListPagination.vue'
import ListContainer from '../lists/ListContainer.vue'
import { useRequestParamsStore } from '@/stores/params'
import ApiLogsListBar from './ApiLogsListBar.vue'
import ApiLogsListCard from './ApiLogsListCard.vue'
import { DUMMY_API_LOGS_LIST_DATA } from '@/datas/dummy'

const { params } = useRequestParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.page = value
}

// Data Handling
</script>
