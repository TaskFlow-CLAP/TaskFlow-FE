<template>
  <div class="flex justify-between items-center px-6 py-3 border-l-8 border-primary1">
    <span class="text-2xl font-bold text-black">{{ title }}</span>
    <div
      v-if="$slots.button"
      class="flex gap-2">
      <slot
        name="button"
        class="flex gap-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
defineEmits(['buttonClick'])
</script>
