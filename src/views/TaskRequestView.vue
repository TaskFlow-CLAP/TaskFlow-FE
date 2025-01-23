<template>
  <div class="max-w-600 flex flex-col px-6 gap-y-6">
    <div class="w-full h-[54px] border-l-8 border-l-primary1 flex items-center pl-5">
      <h1 class="text-2xl font-bold">작업 요청</h1>
    </div>
    <RequestTask />
  </div>
</template>

<script setup lang="ts">
import RequestTask from '@/components/RequestTask.vue'
</script>
