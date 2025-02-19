<template>
  <div>
    <p class="task-detail">히스토리</p>
    <TaskDetailHistoryInput
      :history="historyData"
      :taskId="taskId"
      :requestor-name="requestorName" />
    <div class="flex flex-col w-full items-center mt-8 gap-6">
      <div
        class="flex w-full flex-col items-center gap-6"
        v-for="(item, i) in historyData"
        :key="item.historyId">
        <div
          v-if="shouldDisplayDate(i)"
          class="flex px-4 h-7 items-center justify-center bg-primary1 rounded-full text-white text-xs font-semibold">
          {{ formatDateWithDay(item.date) }}
        </div>
        <div class="flex flex-col w-full items-center gap-1 font-semibold">
          <div
            v-if="item.taskHistoryType !== 'COMMENT' && item.taskHistoryType !== 'COMMENT_FILE'"
            class="text-xs font-semibold text-body">
            {{ formatTimeShort(item.time) }}
          </div>
          <div
            v-if="
              item.taskHistoryType === 'STATUS_SWITCHED' ||
              item.taskHistoryType === 'PROCESSOR_CHANGED' ||
              item.taskHistoryType === 'PROCESSOR_ASSIGNED' ||
              item.taskHistoryType === 'TASK_TERMINATED'
            "
            class="flex w-full gap-1 justify-center text-body text-sm">
            <p>
              {{ HISTORY_MSG_BEFORE[item.taskHistoryType] }}
            </p>
            <p
              v-if="item.taskHistoryType !== 'TASK_TERMINATED'"
              class="text-primary1">
              {{ item.details.taskDetails?.value }}
            </p>
            <p>{{ HISTORY_MSG_AFTER[item.taskHistoryType] }}</p>
          </div>
          <span
            class="text-xs text-disabled text-center"
            v-if="item.taskHistoryType === 'TASK_TERMINATED'">
            사유 : {{ item.details.taskDetails?.value }}
          </span>
          <div class="flex w-full flex-col items-center">
            <TaskDetailHistoryChat
              v-if="item.taskHistoryType === 'COMMENT'"
              :history="item"
              :requestor-name="requestorName"
              :task-id="taskId" />
            <TaskDetailHistoryFile
              v-if="item.taskHistoryType === 'COMMENT_FILE'"
              :history="item"
              :requestor-name="requestorName"
              :task-id="taskId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HISTORY_MSG_AFTER, HISTORY_MSG_BEFORE } from '@/constants/user'
import type { TaskDetailHistoryProps } from '@/types/common'
import { formatDateWithDay, formatTimeShort } from '@/utils/date'
import { watch } from 'vue'
import TaskDetailHistoryChat from './TaskDetailHistoryChat.vue'
import TaskDetailHistoryFile from './TaskDetailHistoryFile.vue'
import TaskDetailHistoryInput from './TaskDetailHistoryInput.vue'

const { historyData, taskId, requestorName } = defineProps<TaskDetailHistoryProps>()

let displayedDates = new Set<string>()

const shouldDisplayDate = (index: number) => {
  const date = formatDateWithDay(historyData[index].date)
  if (displayedDates.has(date)) return false
  else displayedDates.add(date)
  return true
}

watch(
  () => historyData,
  () => {
    displayedDates = new Set<string>()
  }
)
</script>
