<template>
  <div class="flex-grow flex flex-col gap-6">
    <div>
      <p class="task-detail">1차 카테고리</p>
      <p>{{ data.mainCategoryName }}</p>
    </div>
    <div>
      <p class="task-detail">2차 카테고리</p>
      <p>{{ data.categoryName }}</p>
    </div>
    <div>
      <p class="task-detail">제목</p>
      <p>{{ data.title }}</p>
    </div>
    <div v-if="data.description">
      <p class="task-detail">부가 설명</p>
      <p
        class="px-6 py-4 bg-primary2 rounded-lg font-normal min-h-[120px] whitespace-pre-wrap break-all">
        {{ data.description }}
      </p>
    </div>
    <div v-if="data.attachmentResponses.length !== 0">
      <p class="task-detail">첨부 파일</p>
      <TaskDetailFiles :files="data.attachmentResponses" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskDetailDatas } from '@/types/user'
import TaskDetailFiles from './TaskDetailFiles.vue'
const { data } = defineProps<{
  data: TaskDetailDatas
}>()
</script>
