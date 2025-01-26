<template>
  <div class="list-view">
    <TitleBar title="승인 대기 중인 요청" />

    <RequestedFilterBar />

    <RequestedList />
  </div>
</template>

<script setup lang="ts">
import RequestedFilterBar from '@/components/requested/RequestedFilterBar.vue'
import RequestedList from '@/components/requested/RequestedList.vue'
import TitleBar from '@/components/TitleBar.vue'
</script>
