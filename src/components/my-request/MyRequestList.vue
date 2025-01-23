<template>
  <div class="flex flex-col items-center gap-4 grow overflow-hidden">
    <div class="w-full flex flex-col grow overflow-hidden">
      <MyRequestListBar />

      <div class="overflow-y-auto">
        <MyRequestListCard
          v-for="info in DUMMY_MY_REQUEST_LIST_INFO"
          :key="info.taskId"
          :info="info" />
      </div>
    </div>

    <ListPagination
      :page-number="params.pageNumber"
      :total-page="DUMMY_TOTAL_PAGE"
      @update:page-number="onPageChange" />
  </div>
</template>

<script setup lang="ts">
import { DUMMY_MY_REQUEST_LIST_INFO } from '@/constants/dummy'
import MyRequestListBar from './MyRequestListBar.vue'
import MyRequestListCard from './MyRequestListCard.vue'
import { useMyRequestParamsStore } from '@/stores/params'
import ListPagination from '../ListPagination.vue'

const { params } = useMyRequestParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.pageNumber = value
}
</script>
