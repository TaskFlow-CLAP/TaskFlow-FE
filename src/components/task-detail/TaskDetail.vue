<template>
  <div class="flex flex-col rounded-lg max-w-1200 bg-white">
    <div class="w-full flex justify-between items-center">
      <div class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="reRequestIcon" />
        <p class="text-sx text-body font-bold">재요청</p>
      </div>
      <CommonIcons
        :name="closeIcon"
        class="cursor-pointer" />
    </div>
    <div class="w-full flex gap-6">
      <div class="w-full flex flex-col gap-y-8">
        <TaskDetailLeft :task-detail="DUMMY_TASK_DETAIL_LEFT" />
        <div class="w-full border-border-1 border"></div>
        <TaskDetailHistory :history="DUMMY_TASK_DETAIL_HISTORY" />
      </div>
      <div class="w-[1px] border border-border-1"></div>
      <TaskDetailRight :task-detail="DUMMY_TASK_DETAIL_RIGHT" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { closeIcon, reRequestIcon } from '@/constants/iconPath'
import {
  DUMMY_TASK_DETAIL_HISTORY,
  DUMMY_TASK_DETAIL_LEFT,
  DUMMY_TASK_DETAIL_RIGHT
} from '@/datas/taskdetail'
import CommonIcons from '../common/CommonIcons.vue'
import TaskDetailLeft from './TaskDetailLeft.vue'
import TaskDetailRight from './TaskDetailRight.vue'
import TaskDetailHistory from './TaskDetailHistory.vue'
</script>
