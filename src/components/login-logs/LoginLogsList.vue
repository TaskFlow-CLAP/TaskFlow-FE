<template>
  <ListContainer>
    <template #listBar>
      <LoginLogsListBar />
    </template>

    <template #listCards>
      <LoginLogsListCard
        v-for="info in DUMMY_LOGIN_LOGS_LIST_DATA"
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
import { DUMMY_LOGIN_LOGS_LIST_DATA } from '@/datas/dummy'
import { useRequestParamsStore } from '@/stores/params'
import LoginLogsListBar from './LoginLogsListBar.vue'
import LoginLogsListCard from './LoginLogsListCard.vue'

const { params } = useRequestParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.page = value
}

// Data Handling
</script>
