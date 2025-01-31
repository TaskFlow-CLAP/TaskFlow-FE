<template>
  <div class="w-full flex items-center justify-center h-screen bg-disabled">
    <TaskDetail
      :isManager="true"
      :isApproved="false"
      :closeTaskDetail="closeTaskDetail" />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import TaskDetail from '@/components/task-detail/TaskDetail.vue'

const closeTaskDetail = () => {
  console.log('닫기')
}
</script>
