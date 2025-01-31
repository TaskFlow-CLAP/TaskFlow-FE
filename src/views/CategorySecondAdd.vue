<template>
  <div class="form-view-container">
    <TitleBar title="2차 카테고리 생성" />
    <CategoryAdd categoryStep="2" />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
import CategoryAdd from '../components/task-management/CategoryAdd.vue'
</script>

<style scoped></style>
