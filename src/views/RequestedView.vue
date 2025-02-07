<template>
  <div class="list-view">
    <TitleBar title="승인 대기 중인 요청" />

    <RequestedFilterBar />

    <RequestedList />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import RequestedFilterBar from '@/components/requested/RequestedFilterBar.vue'
import RequestedList from '@/components/requested/RequestedList.vue'
</script>
