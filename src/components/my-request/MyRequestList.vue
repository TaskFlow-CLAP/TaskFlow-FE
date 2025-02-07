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
import { useRequestParamsStore } from '@/stores/params'
import type { MyRequestResponse } from '@/types/user'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useParseParams } from '../hooks/useParseParams'
import ListContainer from '../lists/ListContainer.vue'
import ListPagination from '../lists/ListPagination.vue'
import NoContent from '../lists/NoContent.vue'
import MyRequestListBar from './MyRequestListBar.vue'
import MyRequestListCard from './MyRequestListCard.vue'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'

const { params } = useRequestParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchMyRequestList = async () => {
  const { parseRequestParams } = useParseParams()
  const parsedParams = parseRequestParams(params)
  const response = await axiosInstance.get('/api/tasks/requests', { params: parsedParams })
  return response.data
}

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery<MyRequestResponse>({
  queryKey: ['myRequest', params],
  queryFn: fetchMyRequestList,
  enabled: isLogined
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
