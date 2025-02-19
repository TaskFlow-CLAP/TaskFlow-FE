<template>
  <div class="flex flex-col gap-1.5 relative">
    <div class="text-xs flex gap-x-1 text-red-1">
      <p class="text-body text-xs font-semibold">부가설명</p>
      <p v-if="isInvalidateState === 'description'">부가설명은 1000자 이내로 적어주세요</p>
    </div>
    <textarea
      class="w-full h-32 border border-border-1 px-4 py-2 resize-none focus:outline-none rounded"
      :value="modelValue"
      :placeholder="placeholderText"
      :maxlength="1000"
      @input="updateValue(($event.target as HTMLInputElement).value)">
    </textarea>
    <p
      v-if="limitLength"
      class="absolute text-xs top-[calc(100%+4px)] w-full flex justify-end text-body">
      ({{ inputLength }}/{{ limitLength }})
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { RequestTaskTextAreaProps } from '@/types/user'
import { computed } from 'vue'

const { modelValue, placeholderText, isInvalidate, limitLength } =
  defineProps<RequestTaskTextAreaProps>()
const emit = defineEmits(['update:modelValue'])
const isInvalidateState = computed(() => isInvalidate)

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}

const inputLength = computed(() => modelValue.length)
</script>
