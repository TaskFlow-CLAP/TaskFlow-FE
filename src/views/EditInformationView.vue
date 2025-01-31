<template>
  <div class="form-view-container">
    <TitleBar title="내 정보 수정" />

    <EditInformation />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
import EditInformation from '../components/EditInformation.vue'
</script>

<style scoped></style>
