<template>
  <div class="relative">
    <div class="text-xs flex gap-x-1 mb-2">
      <p class="text-body font-bold">{{ labelName }}</p>
      <p
        v-if="!isNotRequired"
        class="text-red-1">
        *
      </p>
      <p
        v-if="isInvalidateState === 'input'"
        class="text-red-1">
        {{ labelName }}을 입력해주세요
      </p>
    </div>
    <input
      class="w-full h-11 border border-border-1 px-4 focus:outline-none text-black"
      :value="modelValue"
      :disabled="isEdit"
      @input="updateValue(($event.target as HTMLInputElement).value)"
      :placeholder="placeholderText" />
    <p
      v-if="isInvalidateState === 'input'"
      class="text-red-1 text-xs absolute top-[calc(100%+4px)]">
      {{ labelName }}을 입력해주세요
    </p>
    <p
      v-if="isInvalidateState === 'code'"
      class="text-red-1 text-xs absolute top-[calc(100%+4px)]">
      사용할 수 없는 고유코드입니다.
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { RequestTaskInputProps } from '@/types/user'
import { computed } from 'vue'
const { modelValue, placeholderText, labelName, isNotRequired, isEdit, isInvalidate } =
  defineProps<RequestTaskInputProps>()

const isInvalidateState = computed(() => isInvalidate)

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>
