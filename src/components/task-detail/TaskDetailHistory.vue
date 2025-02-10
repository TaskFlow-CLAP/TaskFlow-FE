<template>
  <div>
    <p class="task-detail">히스토리</p>
    <TaskDetailHistoryInput
      :history="historyData"
      :taskId="taskId"
      :requestor-name="requestorName" />
    <div class="flex flex-col w-full items-center mt-8 gap-[22px]">
      <div
        class="flex w-full flex-col items-center gap-[22px]"
        v-for="(item, i) in historyData"
        :key="item.historyId">
        <div
          v-if="shouldDisplayDate(i)"
          class="flex px-4 h-7 items-center justify-center bg-primary1 rounded-full text-white text-xs font-bold">
          {{ formatDateWithDay(item.date) }}
        </div>
        <div class="flex flex-col w-full items-center gap-1 font-bold">
          <div
            v-if="item.taskHistoryType !== 'COMMENT' && item.taskHistoryType !== 'COMMENT_FILE'"
            class="text-xs font-bold text-body">
            {{ formatOnlyTime(item.time) }}
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
            <p>{{ HistoryMessageAfter[item.taskHistoryType] }}</p>
          </div>
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
import { HistoryMessageAfter, HistoryMessageBefore } from '@/constants/user'
import type { TaskDetailHistoryProps } from '@/types/common'
import { formatDateWithDay, formatOnlyTime } from '@/utils/date'
import { watch } from 'vue'
import TaskDetailHistoryChat from './TaskDetailHistoryChat.vue'
import TaskDetailHistoryFile from './TaskDetailHistoryFile.vue'
import TaskDetailHistoryInput from './TaskDetailHistoryInput.vue'

const { historyData, taskId, requestorName } = defineProps<TaskDetailHistoryProps>()
console.log(historyData)

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
