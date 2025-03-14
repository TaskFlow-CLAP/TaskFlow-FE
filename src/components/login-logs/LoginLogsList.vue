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
import { useMemberStore } from '@/stores/member'
import { useLogsParamsStore } from '@/stores/params'
import type { LoginLogsResponse } from '@/types/admin'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import ListContainer from '../lists/ListContainer.vue'
import ListPagination from '../lists/ListPagination.vue'
import NoContent from '../lists/NoContent.vue'
import LoginLogsListBar from './LoginLogsListBar.vue'
import LoginLogsListCard from './LoginLogsListCard.vue'

const { params } = useLogsParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchLoginLogsList = async () => {
  const response = await axiosInstance.get('/api/managements/logs/login', {
    params: {
      ...params,
      logStatus: params.logStatus.join(',')
    }
  })
  return response.data
}

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery<LoginLogsResponse>({
  queryKey: ['loginLogs', params],
  queryFn: fetchLoginLogsList,
  enabled: isLogined
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
