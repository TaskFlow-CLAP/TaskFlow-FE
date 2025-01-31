<template>
  <div class="flex flex-col rounded-lg max-w-1200 bg-white">
    <div class="w-full flex justify-between items-center">
      <div class="flex gap-4 text-sm font-bold">
        <div
          v-if="!isManager"
          class="flex gap-1 items-center cursor-pointer">
          <CommonIcons :name="reRequestIcon" />
          <p class="text-body">재요청</p>
        </div>
        <div
          v-if="status.iconName && status.text"
          class="flex gap-1 items-center cursor-pointer">
          <CommonIcons :name="status.iconName" />
          <p class="text-primary1">{{ status.text }}</p>
        </div>
        <div
          v-if="isManager"
          class="flex gap-1 items-center cursor-pointer">
          <CommonIcons :name="cancelIcon" />
          <p class="text-red-1">요청취소</p>
        </div>
      </div>
      <CommonIcons
        :name="closeIcon"
        @click="closeTaskDetail"
        class="cursor-pointer" />
    </div>
    <div class="w-full flex gap-6">
      <div class="w-full flex flex-col gap-y-8 overflow-y-auto scrollbar-hide">
        <TaskDetailLeft :task-detail="DUMMY_TASK_DETAIL_LEFT" />
        <div class="w-full border-border-1 border"></div>
        <TaskDetailHistory
          :history="DUMMY_TASK_DETAIL_HISTORY"
          :is-approved="false"
          :is-manager="false" />
      </div>
      <div class="w-[1px] bg-border-1"></div>
      <TaskDetailRight :task-detail="DUMMY_TASK_DETAIL_RIGHT" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  approveIcon,
  cancelIcon,
  closeIcon,
  modificationIcon,
  reRequestIcon
} from '@/constants/iconPath'
import * as taskDetailData from '@/datas/taskdetail'
import type { TaskDetailProps } from '@/types/user'
import CommonIcons from '../common/CommonIcons.vue'
import TaskDetailHistory from './TaskDetailHistory.vue'
import TaskDetailLeft from './TaskDetailLeft.vue'
import TaskDetailRight from './TaskDetailRight.vue'

const { DUMMY_TASK_DETAIL_HISTORY, DUMMY_TASK_DETAIL_LEFT, DUMMY_TASK_DETAIL_RIGHT } =
  taskDetailData

const { isManager, isApproved, closeTaskDetail } = defineProps<TaskDetailProps>()

const getStatus = (isManager: boolean) => {
  if (!isManager && !isApproved) {
    return {
      iconName: modificationIcon,
      text: '요청 수정'
    }
  } else if (isManager && !isApproved) {
    return {
      iconName: approveIcon,
      text: '요청 승인'
    }
  } else {
    return {}
  }
}

const status = getStatus(isManager)
</script>
