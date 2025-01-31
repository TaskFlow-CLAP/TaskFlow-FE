<template>
  <div class="form-view-container">
    <TitleBar title="작업 요청" />
    <RequestTask />
  </div>
</template>

<script setup lang="ts">
import RequestTask from '@/components/request-task/RequestTask.vue'
import TitleBar from '@/components/TitleBar.vue'
</script>
