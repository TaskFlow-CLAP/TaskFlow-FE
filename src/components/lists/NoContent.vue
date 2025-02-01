<template>
  <div class="w-full h-full flex justify-center items-center">
    <span class="text-lg text-disabled font-bold">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
const { content = '표시할 항목이 없어요' } = defineProps<{ content?: string }>()
</script>
