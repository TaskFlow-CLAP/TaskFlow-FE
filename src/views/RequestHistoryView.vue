<template>
  <div class="list-view">
    <TitleBar title="전체 요청 기록" />

    <RequestHistoryFilterBar />

    <RequestHistoryList />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import RequestHistoryFilterBar from '@/components/request-history/RequestHistoryFilterBar.vue'
import RequestHistoryList from '@/components/request-history/RequestHistoryList.vue'
</script>
