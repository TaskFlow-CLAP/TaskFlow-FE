<template>
  <div class="flex-grow flex flex-col gap-6 pt-6">
    <div>
      <p class="task-detail">1차 카테고리</p>
      <p>{{ taskDetail.mainCategoryName }}</p>
    </div>
    <div>
      <p class="task-detail">2차 카테고리</p>
      <p>{{ taskDetail.categoryName }}</p>
    </div>
    <div>
      <p class="task-detail">제목</p>
      <p>{{ taskDetail.title }}</p>
    </div>
    <div>
      <p class="task-detail">부가 설명</p>
      <p class="px-6 py-4 bg-primary2 rounded-lg font-normal">{{ taskDetail.description }}</p>
    </div>
    <div>
      <p class="task-detail">첨부 파일</p>
      <TaskDetailFiles :files="taskDetail.attachmentResponse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskDetailLeftProps } from '@/types/user'
import TaskDetailFiles from './TaskDetailFiles.vue'
const { taskDetail } = defineProps<{ taskDetail: TaskDetailLeftProps }>()
</script>

<style scoped></style>
