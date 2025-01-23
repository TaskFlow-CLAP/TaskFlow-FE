<script setup lang="ts">
import RequestTask from '@/components/RequestTask.vue'
</script>

<template>
  <div class="Home">
    <RequestTask />
    <h1>This is an Home page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .Home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
