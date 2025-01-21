<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="bg-black text-xl">{{ msg }}</div>
</template>
