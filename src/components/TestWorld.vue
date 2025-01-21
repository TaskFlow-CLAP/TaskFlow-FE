<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="bg-red-2 text-xl h-screen">{{ msg }}</div>
</template>
