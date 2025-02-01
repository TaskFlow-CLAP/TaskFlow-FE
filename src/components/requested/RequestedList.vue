<template>
  <ListContainer>
    <template #listBar>
      <RequestedListBar />
    </template>

    <template #listCards>
      <RequestedListCard
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
import RequestedListBar from './RequestedListBar.vue'
import RequestedListCard from './RequestedListCard.vue'
import { useRequestParamsStore } from '@/stores/params'
import { useParseParams } from '../hooks/useParseParams'
import axiosInstance from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { RequestedResponse } from '@/types/manager'
import NoContent from '../lists/NoContent.vue'

const { params } = useRequestParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchRequestedList = async () => {
  const { parseRequestParams } = useParseParams()
  const parsedParams = parseRequestParams(params)
  const response = await axiosInstance.get('/api/tasks/requests/pending', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
    params: parsedParams
  })
  return response.data
}

const { data } = useQuery<RequestedResponse>({
  queryKey: ['requested', params],
  queryFn: fetchRequestedList
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
