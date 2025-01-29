<template>
  <div class="list-view">
    <TitleBar title="내 작업" />

    <MyTaskFilterBar />

    <MyTaskList />
  </div>
</template>

<script setup lang="ts">
import MyTaskFilterBar from '@/components/my-task/MyTaskFilterBar.vue'
import MyTaskList from '@/components/my-task/MyTaskList.vue'
import TitleBar from '@/components/TitleBar.vue'
</script>

<style scoped></style>
