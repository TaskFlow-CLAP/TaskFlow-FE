<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template class="w-full h-screen flex flex-col items-center">
  <RouterView />
</template>
<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
