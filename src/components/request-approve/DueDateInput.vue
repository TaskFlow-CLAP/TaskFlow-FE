<template>
  <input
    :type="inputType"
    :value="modelValue"
    class="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer focus:outline-none text-center text-black"
    @focus="e => (e.target as HTMLInputElement).showPicker()"
    @input="updateValue(($event.target as HTMLInputElement).value)" />
</template>

<script lang="ts" setup>
import type { DueDateInputProps } from '@/types/common'
import { defineEmits, defineProps } from 'vue'

const { modelValue, inputType } = defineProps<DueDateInputProps>()
const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
