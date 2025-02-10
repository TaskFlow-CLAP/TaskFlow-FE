<template>
  <ListContainer>
    <template #listBar>
      <ApiLogsListBar />
    </template>

    <template #listCards>
      <ApiLogsListCard
        v-for="info in data?.content"
        :key="info.logId"
        :info="info" />
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
import ApiLogsListBar from './ApiLogsListBar.vue'
import ApiLogsListCard from './ApiLogsListCard.vue'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import type { ApiLogsResponse } from '@/types/admin'
import { computed } from 'vue'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'

const { params } = useLogsParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchApiLogsList = async () => {
  const response = await axiosInstance.get('/api/managements/logs/general', {
    params: {
      ...params,
      logStatus: params.logStatus.join(',')
    }
  })
  return response.data
}

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery<ApiLogsResponse>({
  queryKey: ['apiLogs', params],
  queryFn: fetchApiLogsList,
  enabled: !!isLogined
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
