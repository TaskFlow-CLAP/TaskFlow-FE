<template>
  <div>
    <div class="text-xs flex gap-x-1 mb-2">
      <p class="text-body font-bold">제목</p>
      <p class="text-red-1">*</p>
    </div>
    <input
      class="w-full h-11 border border-border-1 px-4 focus:outline-none"
      v-model="model"
      :placeholder="props.placeholderText" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholderText: String
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<style scoped></style>
