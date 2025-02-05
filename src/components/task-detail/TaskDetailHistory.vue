<template>
  <div>
    <p class="task-detail">히스토리</p>
    <TaskDetailHistoryInput
      :history="historyData"
      :taskId="taskId" />
    <div class="flex flex-col w-full items-center gap-6 mt-8">
      <div
        class="flex w-full flex-col items-center gap-6"
        v-for="item in historyData"
        :key="item.historyId">
        <div
          class="flex px-4 h-7 items-center justify-center bg-primary1 rounded-full text-white text-xs font-bold">
          {{ formatDateWithDay(item.date) }}
        </div>
        <div class="flex w-full gap-1 justify-center text-body text-sm">
          <p>{{ HistoryMessageBefore[item.taskHistoryType] }}</p>
          <p
            v-if="item.taskHistoryType === 'STATUS_SWITCHED'"
            class="text-primary1">
            {{ item.details.taskDetails?.value }}
          </p>
          <p
            v-else-if="
              item.taskHistoryType === 'PROCESSOR_CHANGED' ||
              item.taskHistoryType === 'PROCESSOR_ASSIGNED'
            "
            class="text-primary1">
            {{ item.details.taskDetails?.value }}
          </p>
          <TaskDetailHistoryChat
            v-else-if="item.taskHistoryType === 'COMMENT'"
            :history="item" />
          <p>{{ HistoryMessageAfter[item.taskHistoryType] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HistoryMessageAfter, HistoryMessageBefore } from '@/constants/user'
import type { TaskHistory } from '@/types/user'
import { formatDateWithDay } from '@/utils/date'
import TaskDetailHistoryChat from './TaskDetailHistoryChat.vue'
import TaskDetailHistoryInput from './TaskDetailHistoryInput.vue'

const { historyData, taskId } = defineProps<{ historyData: TaskHistory[]; taskId: number }>()
console.log(historyData, '가져온 히스토리')
</script>
