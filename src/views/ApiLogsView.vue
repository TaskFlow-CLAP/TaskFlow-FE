<template>
  <div class="list-view">
    <TitleBar title="작업 기록" />

    <ApiLogsFilterBar />

    <ApiLogsList />
  </div>
</template>

<script setup lang="ts">
import ApiLogsFilterBar from '@/components/api-logs/ApiLogsFilterBar.vue'
import ApiLogsList from '@/components/api-logs/ApiLogsList.vue'
import TitleBar from '@/components/common/TitleBar.vue'
</script>
