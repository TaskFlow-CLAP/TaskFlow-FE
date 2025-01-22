<template>
  <div
    class="filter-container"
    :style="{ width: widthStyle }"
    :class="!width && 'grow'">
    <span class="filter-title">{{ title }}</span>
    <input
      @input="onValueChange"
      class="w-full h-8 border-b border-border-1 focus:outline-none text-xs text-black px-2" />
  </div>
</template>

<script setup lang="ts">
import type { Filter } from '@/types/user'
import { computed } from 'vue'

const { title, width } = defineProps<Filter>()
const emit = defineEmits(['update:value'])

const widthStyle = computed(() => {
  return width ? `${width}px` : ''
})

const onValueChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  setTimeout(() => {
    emit('update:value', target.value)
  }, 500)
}
</script>
