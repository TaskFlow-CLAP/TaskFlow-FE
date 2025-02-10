<template>
  <ListContainer>
    <template #listBar>
      <MyTaskListBar />
    </template>

    <template #listCards>
      <MyTaskListCard
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
import { useParseParams } from '@/hooks/useParseParams'
import { useMemberStore } from '@/stores/member'
import { useRequestParamsStore } from '@/stores/params'
import type { MyTaskResponse } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import ListContainer from '../lists/ListContainer.vue'
import ListPagination from '../lists/ListPagination.vue'
import NoContent from '../lists/NoContent.vue'
import MyTaskListBar from './MyTaskListBar.vue'
import MyTaskListCard from './MyTaskListCard.vue'

const { params } = useRequestParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchMyTaskList = async () => {
  const { parseRequestParams } = useParseParams()
  const parsedParams = parseRequestParams(params)
  const response = await axiosInstance.get('/api/tasks/assigned', { params: parsedParams })
  return response.data
}

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery<MyTaskResponse>({
  queryKey: ['myTask', params],
  queryFn: fetchMyTaskList,
  enabled: isLogined
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
