<template>
  <ListContainer>
    <template #listBar>
      <RequestHistoryListBar />
    </template>

    <template #listCards>
      <RequestHistoryListCard
        v-for="info in DUMMY_REQUEST_HISTORY_LIST_DATA"
        :key="info.taskId"
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
import { DUMMY_REQUEST_HISTORY_LIST_DATA } from '@/datas/dummy'
import { useRequestParamsStore } from '@/stores/params'
import RequestHistoryListBar from './RequestHistoryListBar.vue'
import RequestHistoryListCard from './RequestHistoryListCard.vue'

const { params } = useRequestParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.page = value
}

// Data Handling
</script>
