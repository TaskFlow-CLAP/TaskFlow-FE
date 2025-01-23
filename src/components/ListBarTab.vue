<template>
  <div
    class="text-xs font-bold text-body gap-[2px]"
    :style="{ width: width ? `${width}px` : '' }"
    :class="!width && 'grow'">
    {{ content }}
    <button
      v-if="order"
      @click="$emit('toggleOrder')">
      {{ order === 'DESC' ? 'V' : '^' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { type Ref } from 'vue'

const { content, width, order } = defineProps<{
  content: string
  width?: number
  order?: Ref<'DESC' | 'ASC'> | 'DESC' | 'ASC'
}>()
defineEmits(['toggleOrder'])
</script>
