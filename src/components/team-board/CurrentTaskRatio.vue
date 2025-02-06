<template>
  <div class="flex flex-col gap-3">
    <span class="text-xl font-bold text-black">현재 작업 비율</span>
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-body">진행 중 {{ teamSummary.inProgress }}건</span>
          <div class="w-[1px] h-[10px] bg-body" />
          <span class="text-xs font-bold text-body">완료 대기 {{ teamSummary.inReviewing }}건</span>
        </div>
        <span class="text-xs font-bold text-primary1">총 {{ teamSummary.totalTasks }}건</span>
      </div>
      <div
        class="w-full h-[360px] rounded-lg bg-primary2 shadow-custom overflow-y-scroll items-center p-6 gap-4">
        <PieChart
          :labels="chartLabels"
          :series="chartSeries" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PieChart from '../PieChart.vue'

const { teamSummary, teamData } = defineProps<{
  teamSummary: {
    inProgress: number
    inReviewing: number
    totalTasks: number
  }
  teamData: { name: string; tasks: number }[]
}>()

const chartSeries = teamData.map(member => member.tasks)
const chartLabels = teamData.map(member => member.name)
</script>
