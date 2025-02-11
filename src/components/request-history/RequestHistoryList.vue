<template>
  <ListContainer>
    <template #listBar>
      <RequestHistoryListBar />
    </template>

    <template #listCards>
      <RequestHistoryListCard
        v-for="info in data?.content"
        :key="info.taskStatus + info.processorName + info.taskId"
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
import { useParseParams } from '@/hooks/useParseParams'
import { useMemberStore } from '@/stores/member'
import { useRequestParamsStore } from '@/stores/params'
import type { RequestHistoryResponse } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import ListContainer from '../lists/ListContainer.vue'
import ListPagination from '../lists/ListPagination.vue'
import NoContent from '../lists/NoContent.vue'
import RequestHistoryListBar from './RequestHistoryListBar.vue'
import RequestHistoryListCard from './RequestHistoryListCard.vue'

const { params } = useRequestParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchRequestHistoryList = async () => {
  const { parseRequestParams } = useParseParams()
  const parsedParams = parseRequestParams(params)
  const response = await axiosInstance.get('/api/tasks', { params: parsedParams })
  return response.data
}

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery<RequestHistoryResponse>({
  queryKey: ['requestHistory', params],
  queryFn: fetchRequestHistoryList,
  enabled: isLogined
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
