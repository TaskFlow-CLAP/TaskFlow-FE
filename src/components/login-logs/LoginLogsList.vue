<template>
  <ListContainer>
    <template #listBar>
      <LoginLogsListBar />
    </template>

    <template #listCards>
      <LoginLogsListCard
        v-for="info in data?.content"
        :key="info.logId"
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
import { useLogsParamsStore } from '@/stores/params'
import LoginLogsListBar from './LoginLogsListBar.vue'
import LoginLogsListCard from './LoginLogsListCard.vue'
import axiosInstance from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { LoginLogsResponse } from '@/types/admin'
import NoContent from '../lists/NoContent.vue'

const { params } = useLogsParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchLoginLogsList = async () => {
  const response = await axiosInstance.get('/api/logs/login', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
    params: {
      ...params,
      logStatus: params.logStatus.join(',')
    }
  })
  return response.data
}

const { data } = useQuery<LoginLogsResponse>({
  queryKey: ['loginLogs', params],
  queryFn: fetchLoginLogsList
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
