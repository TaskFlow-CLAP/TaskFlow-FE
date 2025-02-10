<template>
  <div class="flex flex-col gap-2 items-center">
    <span class="text-4xl font-bold whitespace-pre-wrap text-center leading-tight">
      {{ title }}
    </span>
    <span class="whitespace-pre-wrap text-body text-center">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; content?: string }>()
</script>
