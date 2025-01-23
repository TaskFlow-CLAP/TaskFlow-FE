<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopMenu from './components/TopMenu.vue'
</script>

<template>
  <TopMenu />
  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
