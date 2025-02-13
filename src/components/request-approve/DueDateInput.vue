<template>
  <input
    :type="inputType"
    :value="modelValue"
    class="w-full border border-border-1 rounded px-3 py-2 cursor-pointer focus:outline-none text-center"
    :class="isInvalidate ? 'border-red-1' : 'border-border-1'"
    :min="inputType === 'date' ? minValue : undefined"
    @focus="e => (e.target as HTMLInputElement).showPicker()"
    @input="updateValue(($event.target as HTMLInputElement).value)" />
</template>

<script lang="ts" setup>
import type { DueDateInputProps } from '@/types/common'
import { computed, defineEmits, defineProps, onMounted } from 'vue'

const { modelValue, inputType, isInvalidate } = defineProps<DueDateInputProps>()

const emit = defineEmits(['update:modelValue'])

const minValue = computed(() => {
  const now = new Date()
  return now.toISOString().split('T')[0]
})

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}

onMounted(() => {
  emit('update:modelValue', null)
})
</script>
