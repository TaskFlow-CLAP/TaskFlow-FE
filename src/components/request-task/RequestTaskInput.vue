<template>
  <div class="relative w-full">
    <div class="text-xs flex gap-x-1 mb-2 text-red-1">
      <p class="text-body font-bold">{{ labelName }}</p>
      <p v-if="!isNotRequired">*</p>
      <p v-if="isInvalidateState === 'input'">{{ labelName }}을 입력해주세요</p>
      <p v-if="isInvalidateState === 'duplicate'">회원아이디가 중복되었습니다</p>
      <p v-if="isInvalidateState === 'title'">제목은 30자 이내로 적어주세요</p>
      <p v-if="isInvalidateState === 'noCode'">작업코드를 입력해주세요</p>
      <p v-if="isInvalidateState === 'code'">사용할 수 없는 작업코드입니다</p>
      <p v-if="isInvalidateState === 'categoryName'">카테고리명을 입력해주세요</p>
      <p v-if="isInvalidateState === 'wrongNickname'">잘못된 형식의 아이디입니다</p>
    </div>
    <input
      class="w-full h-11 border border-border-1 px-4 focus:outline-none rounded"
      :value="modelValue"
      :disabled="isEdit"
      @input="updateValue(($event.target as HTMLInputElement).value)"
      :placeholder="placeholderText"
      :class="{ 'text-gray-500': isEdit }"
      :maxlength="labelName === '제목' ? 30 : undefined" />
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
