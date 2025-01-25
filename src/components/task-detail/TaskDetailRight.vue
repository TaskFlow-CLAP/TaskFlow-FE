<template>
  <div class="w-60 flex flex-col gap-y-6 py-6 text-black">
    <div>
      <p class="task-detail">ID</p>
      <p>{{ taskDetail.taskId }}</p>
    </div>
    <div>
      <p class="task-detail">요청일</p>
      <p>{{ taskDetail.requestedAt }}</p>
    </div>
    <div>
      <p class="task-detail">종료일</p>
      <p>{{ taskDetail.finishedAt }}</p>
    </div>
    <div>
      <p class="task-detail">상태</p>
      <p>{{ taskDetail.taskStatus }}</p>
    </div>
    <div>
      <p class="task-detail">요청자</p>
      <div class="flex gap-2">
        <img
          :src="taskDetail.requesterImageUrl"
          width="24"
          height="24"
          class="rounded-full"
          alt="requesterImg" />
        <p>{{ taskDetail.requesterNickName }}</p>
      </div>
    </div>
    <div>
      <p class="task-detail">처리자</p>
      <div class="flex gap-2">
        <img
          :src="taskDetail.processorImageUrl"
          width="24"
          height="24"
          class="rounded-full"
          alt="requesterImg" />
        <p>{{ taskDetail.processorNickName }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskDetailRightProps } from '@/types/user'
import { defineProps } from 'vue'

const { taskDetail } = defineProps<{ taskDetail: TaskDetailRightProps }>()
</script>

<script setup lang="ts"></script>
