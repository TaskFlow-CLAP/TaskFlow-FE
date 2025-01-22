<template>
  <div>
    <p class="text-body font-bold mb-2">부가설명</p>
    <textarea
      class="w-full h-24 mt-2 border border-border-1 px-4 py-2 resize-none"
      v-model="model"
      :placeholder="props.placeholderText">
    </textarea>
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
