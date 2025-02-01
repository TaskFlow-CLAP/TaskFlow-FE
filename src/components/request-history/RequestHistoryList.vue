<template>
  <ListContainer>
    <template #listBar>
      <RequestHistoryListBar />
    </template>

    <template #listCards>
      <RequestHistoryListCard
        v-for="info in data?.content"
        :key="info.taskId"
        :info="info" />
      <NoContent v-if="data?.content.length === 0" />
    </template>

    <template #pagination>
      <ListPagination
        :page-number="params.page + 1"
        :total-page="totalPage || 0"
        @update:page-number="onPageChange" />
    </template>
  </ListContainer>
</template>

<script setup lang="ts">
import ListPagination from '../lists/ListPagination.vue'
import ListContainer from '../lists/ListContainer.vue'
import { useRequestParamsStore } from '@/stores/params'
import RequestHistoryListBar from './RequestHistoryListBar.vue'
import RequestHistoryListCard from './RequestHistoryListCard.vue'
import { useParseParams } from '../hooks/useParseParams'
import axiosInstance from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { RequestHistoryResponse } from '@/types/manager'
import NoContent from '../lists/NoContent.vue'

const { params } = useRequestParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchRequestHistoryList = async () => {
  const { parseRequestParams } = useParseParams()
  const parsedParams = parseRequestParams(params)
  const response = await axiosInstance.get('/api/tasks', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
    params: parsedParams
  })
  return response.data
}

const { data } = useQuery<RequestHistoryResponse>({
  queryKey: ['requestHistory', params],
  queryFn: fetchRequestHistoryList
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
