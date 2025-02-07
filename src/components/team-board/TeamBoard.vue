<template>
  <div class="grow overflow-y-scroll p-6">
    <div class="grid grid-cols-3 gap-12">
      <CurrentTaskRatio
        :team-summary="teamSummary"
        :team-data="teamData" />
      <TeamBoardCard
        v-for="member in data?.members"
        :key="member.processorId"
        :info="member" />
      <NoContent
        v-if="data?.members.length === 0"
        content="검색된 담당자가 없습니다" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamBoardCard from './TeamBoardCard.vue'
import CurrentTaskRatio from './CurrentTaskRatio.vue'
import { axiosInstance } from '@/utils/axios'
import { useTeamBoardParamsStore } from '@/stores/params'
import { useQuery } from '@tanstack/vue-query'
import { useParseParams } from '../hooks/useParseParams'
import type { TeamBoardResponse } from '@/types/manager'
import { computed } from 'vue'
import NoContent from '../lists/NoContent.vue'
import { useMemberStore } from '@/stores/member'

const { params } = useTeamBoardParamsStore()

const fetchTeamStatus = async () => {
  const { parseBoardParams } = useParseParams()
  const parsedParams = parseBoardParams(params)
  const response = await axiosInstance.get('/api/team-status/filter', { params: parsedParams })
  return response.data
}
const { isLogined } = useMemberStore()
const { data } = useQuery<TeamBoardResponse>({
  queryKey: ['teamStatus', params],
  queryFn: fetchTeamStatus,
  enabled: isLogined
})

const teamSummary = computed(() => {
  return {
    inProgress: data.value?.totalInProgressTaskCount || 0,
    inReviewing: data.value?.totalInReviewingTaskCount || 0,
    totalTasks: data.value?.totalTaskCount || 0
  }
})

const teamData = computed(() => {
  return (
    data.value?.members.map(el => ({
      name: el.nickname,
      tasks: el.totalTaskCount
    })) || []
  )
})
</script>
