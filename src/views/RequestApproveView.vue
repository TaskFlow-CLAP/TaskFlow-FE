<template>
  <div class="form-view-container">
    <TitleBar title="요청 승인" />

    <RequestApprove />
  </div>
</template>

<script setup lang="ts">
import RequestApprove from '@/components/request-approve/RequestApprove.vue'
import TitleBar from '@/components/TitleBar.vue'
</script>
