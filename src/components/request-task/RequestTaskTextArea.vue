<template>
  <div class="flex flex-col gap-2">
    <p class="text-body text-xs font-bold">부가설명</p>
    <textarea
      class="w-full h-32 border border-border-1 px-4 py-2 resize-none focus:outline-none rounded"
      :value="modelValue"
      :placeholder="placeholderText"
      @input="updateValue(($event.target as HTMLInputElement).value)">
    </textarea>
  </div>
</template>

<script lang="ts" setup>
import type { RequestTaskTextAreaProps } from '@/types/user'

const { modelValue, placeholderText } = defineProps<RequestTaskTextAreaProps>()
const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
