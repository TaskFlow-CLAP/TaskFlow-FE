<template>
  <div class="max-w-600 flex flex-col px-6 gap-y-6 pt-10">
    <div class="w-full h-[54px] border-l-8 border-l-primary1 flex items-center pl-5">
      <h1 class="text-2xl font-bold">요청 승인</h1>
    </div>
    <RequestApprove />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import RequestApprove from '@/components/request-approve/RequestApprove.vue'
</script>
