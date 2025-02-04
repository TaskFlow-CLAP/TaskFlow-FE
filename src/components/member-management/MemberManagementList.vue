<template>
  <ListContainer>
    <template #listBar>
      <MemberManagementListBar />
    </template>

    <template #listCards>
      <MemberManagementListCard
        v-for="info in data?.content"
        :key="info.memberId"
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
import { useMemberManagementParamsStore } from '@/stores/params'
import MemberManagementListBar from './MemberManagementListBar.vue'
import MemberManagementListCard from './MemberManagementListCard.vue'
import NoContent from '../lists/NoContent.vue'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { MemberManagementResponse } from '@/types/admin'

const { params } = useMemberManagementParamsStore()
const onPageChange = (value: number) => {
  params.page = value
}

const fetchMemberList = async () => {
  const response = await axiosInstance.get('/api/managements/members', { params })
  return response.data
}

const { data } = useQuery<MemberManagementResponse>({
  queryKey: ['member', params],
  queryFn: fetchMemberList
})

const totalPage = computed(() => {
  return data.value?.totalPages
})
</script>
