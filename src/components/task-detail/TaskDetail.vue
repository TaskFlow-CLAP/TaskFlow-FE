<template>
  <div
    class="flex flex-col overflow-y-auto rounded-lg w-full max-w-[1200px] min-w-[1024px] bg-white p-6">
    <TaskDetailTopBar
      :is-manager="isManager"
      :is-approved="isApproved"
      :close-task-detail="closeTaskDetail" />
    <div class="w-full flex gap-6">
      <div class="w-full h-[718px] flex flex-col gap-y-8 overflow-y-auto scrollbar-hide">
        <TaskDetailLeft :task-detail="DUMMY_TASK_DETAIL" />
        <div class="w-full border-border-1 border"></div>
        <TaskDetailHistory
          :history="DUMMY_TASK_DETAIL_HISTORY"
          :is-approved="false"
          :is-manager="false" />
      </div>
      <div class="w-[1px] bg-border-1"></div>
      <TaskDetailRight
        :task-detail="DUMMY_TASK_DETAIL"
        :is-manager="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as taskDetailData from '@/datas/taskdetail'
import type { TaskDetailProps } from '@/types/user'
import TaskDetailHistory from './TaskDetailHistory.vue'
import TaskDetailLeft from './TaskDetailLeft.vue'
import TaskDetailRight from './TaskDetailRight.vue'
import TaskDetailTopBar from './TaskDetailTopBar.vue'

const { DUMMY_TASK_DETAIL_HISTORY, DUMMY_TASK_DETAIL } = taskDetailData

const { isManager, isApproved, closeTaskDetail } = defineProps<TaskDetailProps>()
</script>
