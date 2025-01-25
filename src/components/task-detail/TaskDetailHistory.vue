<template>
  <div>
    <p class="task-detail">히스토리</p>
    <TaskDetailHistoryInput :history="history" />
    <div class="flex flex-col w-full items-center gap-6">
      <div
        class="flex flex-col items-center"
        v-for="(item, i) in history"
        :key="i">
        <div
          class="flex w-[150px] h-7 items-center justify-center bg-background-1 rounded-xl text-body text-xs font-bold">
          {{ item.date }}
        </div>
        <div class="flex">
          <p>{{ HistoryMessageBefore[item.TaskHistoryType] }}</p>
          <p>{{ item.details.taskStatus }}</p>
          <p>{{ HistoryMessageAfter[item.TaskHistoryType] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HistoryMessageAfter, HistoryMessageBefore } from '@/constants/user'
import type { TaskDetailHistoryProps } from '@/types/user'
import TaskDetailHistoryInput from './TaskDetailHistoryInput.vue'

const { history } = defineProps<{ history: TaskDetailHistoryProps[] }>()
</script>
