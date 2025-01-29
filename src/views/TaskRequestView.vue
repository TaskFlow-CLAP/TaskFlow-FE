<template>
  <div class="form-view-container">
    <div class="form-view-title">
      <h1 class="text-2xl font-bold">작업 요청</h1>
    </div>
    <RequestTask />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import RequestTask from '@/components/request-task/RequestTask.vue'
</script>
