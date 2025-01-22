<template>
  <div class="flex justify-between items-center px-6 py-3 border-l-8 border-primary1">
    <span class="text-2xl font-bold text-black">{{ props.title }}</span>
    <button
      v-if="btn"
      class="text-xs font-bold text-primary1"
      @click="$emit('buttonClick')">
      {{ props.btn }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TitleBar } from '@/types/user'

const props = defineProps<TitleBar>()
defineEmits(['buttonClick'])
</script>
