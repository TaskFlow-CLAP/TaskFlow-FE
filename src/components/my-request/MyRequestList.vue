<template>
  <ListContainer>
    <template #listBar>
      <MyRequestListBar />
    </template>

    <template #listCards>
      <MyRequestListCard
        v-for="info in DUMMY_MY_REQUEST_LIST_INFO"
        :key="info.taskId"
        :info="info" />
    </template>

    <template #pagination>
      <ListPagination
        :page-number="params.pageNumber"
        :total-page="DUMMY_TOTAL_PAGE"
        @update:page-number="onPageChange" />
    </template>
  </ListContainer>
</template>

<script setup lang="ts">
import MyRequestListBar from './MyRequestListBar.vue'
import MyRequestListCard from './MyRequestListCard.vue'
import { useMyRequestParamsStore } from '@/stores/params'
import ListPagination from '../lists/ListPagination.vue'
import ListContainer from '../lists/ListContainer.vue'
import { DUMMY_MY_REQUEST_LIST_INFO } from '@/datas/dummy'

const { params } = useMyRequestParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.pageNumber = value
}

// Data Handling
</script>
