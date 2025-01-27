<template>
  <ListContainer>
    <template #listBar>
      <MemberManagementListBar />
    </template>

    <template #listCards>
      <MemberManagementListCard
        v-for="info in DUMMY_MEMBER_MANAGEMENT_LIST_DATA"
        :key="info.memberId"
        :info="info" />
    </template>

    <template #pagination>
      <ListPagination
        :page-number="params.page"
        :total-page="DUMMY_TOTAL_PAGE"
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
import { DUMMY_MEMBER_MANAGEMENT_LIST_DATA } from '@/datas/dummy'

const { params } = useMemberManagementParamsStore()
const DUMMY_TOTAL_PAGE = 18
const onPageChange = (value: number) => {
  params.page = value
}

// Data Handling
</script>
