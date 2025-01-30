<template>
  <div class="max-w-1200 h-screen flex flex-col gap-6">
    <TitleBar title="작업 보드" />

    <TaskBoardFilterBar />

    <TaskBoard />
  </div>
</template>

<script setup lang="ts">
import TaskBoard from '@/components/task-board/TaskBoard.vue'
import TitleBar from '@/components/TitleBar.vue'
import TaskBoardFilterBar from '@/components/task-board/TaskBoardFilterBar.vue'
</script>
