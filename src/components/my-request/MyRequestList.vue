<template>
  <ListContainer>
    <template #listBar>
      <MyRequestListBar />
    </template>

    <template #listCards>
      <MyRequestListCard
        v-for="info in data?.content"
        :key="info.taskId"
        :info="info" />
    </template>

    <template #pagination>
      <ListPagination
        :page-number="params.page"
        :total-page="data?.totalPages || 0"
        @update:page-number="onPageChange" />
    </template>
  </ListContainer>
</template>

<script setup lang="ts">
import MyRequestListBar from './MyRequestListBar.vue'
import MyRequestListCard from './MyRequestListCard.vue'
import ListPagination from '../lists/ListPagination.vue'
import ListContainer from '../lists/ListContainer.vue'
import { useRequestParamsStore } from '@/stores/params'
import axiosInstance from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { useParseParams } from '../hooks/useParseParams'
import type { MyRequestResponse } from '@/types/user'

const { params } = useRequestParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchRequestList = async () => {
  const { parseRequestParams } = useParseParams()
  const parsedParams = parseRequestParams(params)
  const response = await axiosInstance.get('/api/tasks/requests', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
    params: parsedParams
  })
  return response.data
}

const { data } = useQuery<MyRequestResponse>({
  queryKey: ['myRequest', params],
  queryFn: fetchRequestList
})
</script>
