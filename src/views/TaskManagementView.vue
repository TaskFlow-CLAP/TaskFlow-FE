<template>
  <div class="task-management-view">
    <div class="form-view-title">
      <h1 class="text-2xl font-bold">작업 관리</h1>
    </div>
    <p class="text-xl">카테고리</p>
    <CategoryManagement />
    <div class="w-full h-[1px] bg-border-2"></div>
    <p class="text-xl">구분</p>
    <DivisionManagement />
  </div>
</template>

<script setup lang="ts">
import CategoryManagement from '@/components/task-management/CategoryManagement.vue'
import DivisionManagement from '@/components/task-management/DivisionManagement.vue'
</script>
