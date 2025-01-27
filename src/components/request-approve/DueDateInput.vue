<template>
  <input
    :type="inputType"
    :v-model="modelValue"
    class="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer focus:outline-none text-center"
    @focus="e => (e.target as HTMLInputElement).showPicker()" />
</template>

<script lang="ts" setup>
import type { DueDateInputProps } from '@/types/common'
import { defineProps } from 'vue'

const { modelValue, inputType } = defineProps<DueDateInputProps>()
</script>
