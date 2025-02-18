<template>
  <div
    class="filter-container"
    :style="{ width: width ? `${width}px` : '' }"
    :class="width === 'full' && 'grow'">
    <span class="filter-title">{{ title }}</span>
    <input
      :aria-label="title"
      @input="onValueChange"
      class="w-full h-8 border-b border-border-1 outline-none text-xs px-2" />
  </div>
</template>

<script setup lang="ts">
import type { Filter } from '@/types/common'
import DOMPurify from 'dompurify'

const { title, width = '120' } = defineProps<Filter>()
const emit = defineEmits(['update:value'])

const onValueChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  setTimeout(() => {
    emit('update:value', DOMPurify.sanitize(target.value))
  }, 500)
}
</script>
