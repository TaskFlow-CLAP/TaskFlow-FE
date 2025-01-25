<template>
  <ListContainer>
    <template #listBar>
      <MyRequestListBar />
    </template>

    <template #listCards>
      <MyRequestListCard
        v-for="info in DUMMY_MY_REQUEST_LIST_DATA"
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
import MyRequestListBar from './MyRequestListBar.vue'
import MyRequestListCard from './MyRequestListCard.vue'
import ListPagination from '../lists/ListPagination.vue'
import ListContainer from '../lists/ListContainer.vue'
import { DUMMY_MY_REQUEST_LIST_DATA } from '@/datas/dummy'
import { useRequestParamsStore } from '@/stores/params'

const { params } = useRequestParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.page = value
}

// Data Handling
</script>
