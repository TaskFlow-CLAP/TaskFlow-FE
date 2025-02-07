<template>
  <div class="list-view">
    <TitleBar title="내 작업" />

    <MyTaskFilterBar />

    <MyTaskList />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import MyTaskFilterBar from '@/components/my-task/MyTaskFilterBar.vue'
import MyTaskList from '@/components/my-task/MyTaskList.vue'
</script>

<style scoped></style>
