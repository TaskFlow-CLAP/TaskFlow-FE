<template>
  <div class="list-view">
    <TitleBar title="로그인 기록" />

    <LoginLogsFilterBar />

    <LoginLogsList />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import LoginLogsFilterBar from '@/components/login-logs/LoginLogsFilterBar.vue'
import LoginLogsList from '@/components/login-logs/LoginLogsList.vue'
</script>
