<template>
  <div>
    <div class="text-xs flex gap-x-1 mb-2">
      <p class="text-body font-bold">제목</p>
      <p class="text-red-1">*</p>
    </div>
    <input
      class="w-full h-11 border border-border-1 px-4 focus:outline-none"
      v-model="model"
      :placeholder="placeholderText" />
  </div>
</template>

<script lang="ts" setup>
import type { RequestTaskInputProps } from '@/types/user'
import { computed } from 'vue'

const { modelValue, placeholderText } = defineProps<RequestTaskInputProps>()
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => modelValue,
  set: value => emit('update:modelValue', value)
})
</script>
