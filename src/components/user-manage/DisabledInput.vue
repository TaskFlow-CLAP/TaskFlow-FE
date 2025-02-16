<template>
  <div class="relative w-full">
    <div class="text-xs flex gap-x-1 mb-2 text-body font-semibold">
      {{ labelName }}
      <p class="text-red-1">*</p>
    </div>
    <div
      class="w-full h-11 border px-4 border-border-1 rounded text-disabled bg-background-2 flex items-center">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  labelName: string
  value: string
}>()
</script>
