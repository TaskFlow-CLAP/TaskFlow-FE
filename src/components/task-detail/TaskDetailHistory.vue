<template>
  <div>
    <p class="task-detail">히스토리</p>
    <TaskDetailHistoryInput :history="history" />
    <div class="flex flex-col w-full items-center gap-6 mt-8">
      <div
        class="flex flex-col items-center gap-6"
        v-for="item in history"
        :key="item.name">
        <div
          class="flex w-[150px] h-7 items-center justify-center bg-background-1 rounded-xl text-body text-xs font-bold">
          {{ formatDateWithDay(item.date) }}
        </div>
        <div class="flex gap-1 text-body text-sm">
          <p>{{ HistoryMessageBefore[item.TaskHistoryType] }}</p>
          <p
            v-if="item.TaskHistoryType === 'STATUS_SWITCHED'"
            class="text-primary1">
            {{ item.details.taskStatus }}
          </p>
          <p
            v-else-if="
              item.TaskHistoryType === 'PROCESSOR_CHANGED' ||
              item.TaskHistoryType === 'PROCESSOR_ASSIGNED'
            "
            class="text-primary1">
            {{ item.name }}
          </p>
          <p>{{ HistoryMessageAfter[item.TaskHistoryType] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HistoryMessageAfter, HistoryMessageBefore } from '@/constants/user'
import type { TaskDetailHistoryProps } from '@/types/user'
import { formatDateWithDay } from '@/utils/date'
import TaskDetailHistoryInput from './TaskDetailHistoryInput.vue'

const { history } = defineProps<{ history: TaskDetailHistoryProps[] }>()
</script>
