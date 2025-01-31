<template>
  <div class="task-management-view">
    <TitleBar title="작업 관리" />

    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-6">
        <p class="text-xl text-black">카테고리</p>
        <CategoryManagement />
      </div>
      <div class="w-full h-[1px] bg-border-2"></div>
    </div>
    <p class="text-xl text-black">구분</p>
    <DivisionManagement />
  </div>
</template>

<script setup lang="ts">
import CategoryManagement from '@/components/task-management/CategoryManagement.vue'
import DivisionManagement from '@/components/task-management/DivisionManagement.vue'
import TitleBar from '@/components/TitleBar.vue'
</script>
