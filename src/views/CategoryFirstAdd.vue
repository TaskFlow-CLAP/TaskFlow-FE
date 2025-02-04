<template>
  <div class="form-view-container">
    <TitleBar :title="`1차 카테고리 ${$route.params.id ? '수정' : '등록'}`" />
    <CategoryAdd categoryStep="1" />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
import CategoryAdd from '../components/task-management/CategoryAdd.vue'
</script>
