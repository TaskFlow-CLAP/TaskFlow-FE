<template>
  <div class="form-view-container">
    <TitleBar title="내 정보 수정" />

    <EditInformation />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import EditInformation from '@/components/common/EditInformation.vue'
import TitleBar from '@/components/common/TitleBar.vue'
</script>

<style scoped></style>
