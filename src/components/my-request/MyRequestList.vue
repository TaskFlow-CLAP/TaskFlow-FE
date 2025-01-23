<template>
  <div class="grow overflow-hidden">
    <MyRequestListBar />

    <div class="h-full overflow-y-auto">
      <MyRequestListCard
        v-for="info in DUMMY_MY_REQUEST_LIST_INFO"
        :key="info.taskId"
        :info="info" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DUMMY_MY_REQUEST_LIST_INFO } from '@/constants/dummy'
import MyRequestListBar from './MyRequestListBar.vue'
import MyRequestListCard from './MyRequestListCard.vue'
</script>
