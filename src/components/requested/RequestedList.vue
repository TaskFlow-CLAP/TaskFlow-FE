<template>
  <ListContainer>
    <template #listBar>
      <RequestedListBar />
    </template>

    <template #listCards>
      <RequestedListCard
        v-for="info in DUMMY_REQUESTED_LIST_DATA"
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
import RequestedListBar from './RequestedListBar.vue'
import { useRequestedParamsStore } from '@/stores/params'
import { DUMMY_REQUESTED_LIST_DATA } from '@/datas/dummy'
import RequestedListCard from './RequestedListCard.vue'

const { params } = useRequestedParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.page = value
}

// Data Handling
</script>
