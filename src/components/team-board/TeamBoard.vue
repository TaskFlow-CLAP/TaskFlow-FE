<template>
  <div class="grow overflow-y-scroll p-6">
    <div class="grid grid-cols-3 gap-12">
      <CurrentTaskRatio
        :team-summary="teamSummary"
        :team-data="teamData" />
      <TeamBoardCard
        v-for="member in DUMMY_TEAM_MEMBERS_LIST"
        :key="member.name"
        :name="member.name"
        :department="member.department"
        :task-status-summary="member.taskStatusSummary"
        :tasks="member.tasks" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DUMMY_TEAM_MEMBERS_LIST } from '@/datas/dummy'
import TeamBoardCard from './TeamBoardCard.vue'
import CurrentTaskRatio from './CurrentTaskRatio.vue'

const getSummaryCount = (key: 'inProgress' | 'pendingCompletion' | 'totalTasks') => {
  let count = 0
  DUMMY_TEAM_MEMBERS_LIST.forEach(el => (count += el.taskStatusSummary[key]))
  return count
}
const teamSummary = {
  inProgress: getSummaryCount('inProgress'),
  pendingCompletion: getSummaryCount('pendingCompletion'),
  totalTasks: getSummaryCount('totalTasks')
}

const teamData = DUMMY_TEAM_MEMBERS_LIST.map(el => ({
  name: el.name,
  tasks: el.taskStatusSummary.totalTasks
}))
</script>
