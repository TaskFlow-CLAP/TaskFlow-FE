<template>
  <div class="grow overflow-y-scroll">
    <div class="grid grid-cols-3 gap-12">
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
</script>
