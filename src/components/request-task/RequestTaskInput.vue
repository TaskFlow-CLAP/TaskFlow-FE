<template>
  <div>
    <div class="text-xs flex gap-x-1 mb-2">
      <p class="text-body font-bold">{{ labelName }}</p>
      <p
        v-if="!isNotRequired"
        class="text-red-1">
        *
      </p>
    </div>
    <input
      class="w-full h-11 border border-border-1 px-4 focus:outline-none"
      :value="modelValue"
      :disabled="isEdit"
      @input="updateValue(($event.target as HTMLInputElement).value)"
      :placeholder="placeholderText" />
  </div>
</template>

<script lang="ts" setup>
import type { RequestTaskInputProps } from '@/types/user'

const { modelValue, placeholderText, labelName, isNotRequired, isEdit } =
  defineProps<RequestTaskInputProps>()
const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
