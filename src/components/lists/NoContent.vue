<template>
  <div class="w-full h-full flex justify-center items-center">
    <span class="text-lg text-disabled font-semibold text-center whitespace-pre-wrap">{{
      content
    }}</span>
  </div>
</template>

<script setup lang="ts">
const { content = '표시할 항목이 없습니다' } = defineProps<{ content?: string }>()
</script>
