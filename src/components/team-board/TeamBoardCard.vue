<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full overflow-hidden">
          <img src="https://picsum.photos/24" />
        </div>
        <span class="text-black">{{ info.nickname }}</span>
      </div>
      <span class="text-xs font-bold text-body">{{ info.department }}</span>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-body">진행 중 {{ info.inProgressTaskCount }}건</span>
        <div class="w-[1px] h-[10px] bg-body" />
        <span class="text-xs font-bold text-body">검토 중 {{ info.inReviewingTaskCount }}건</span>
      </div>
      <span class="text-xs font-bold text-primary1">총 {{ info.totalTaskCount }}건</span>
    </div>
    <div
      class="w-full h-[360px] rounded-lg bg-primary2 shadow-custom overflow-y-scroll flex flex-col items-center p-6 gap-4">
      <TaskCard
        v-for="task in info.tasks"
        :key="task.taskId"
        :data="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamBoardCardProps } from '@/types/manager'
import TaskCard from '../TaskCard.vue'

const { info } = defineProps<{ info: TeamBoardCardProps }>()
</script>
