<template>
  <div>
    <div class="flex text-xs text-red-1 gap-x-1 mb-2">
      <p class="text-body font-semibold">{{ labelName }}</p>
      <p v-if="!isLabel">*</p>
      <p v-if="isInvalidate">카테고리를 선택해주세요</p>
    </div>
    <div
      ref="htmlRef"
      class="relative flex">
      <div
        class="flex w-full h-11 items-center rounded p-4 border border-border-1"
        :class="disabled ? 'bg-background-2 text-disabled' : 'bg-white cursor-pointer'"
        @click="!disabled && toggleDropdown()">
        <p :class="{ 'text-disabled': modelValue === placeholderText }">
          {{ modelValue || placeholderText }}
        </p>
        <CommonIcons
          :name="dropdownIcon"
          :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
      </div>
      <div
        v-if="dropdownOpen"
        class="absolute w-full max-h-40 overflow-y-auto scrollbar-hide top-[52px] flex flex-col gap-2 p-2 bg-white rounded z-10 shadow-custom">
        <div
          v-for="option in options"
          :key="option"
          class="w-full flex items-center h-11 p-2 rounded hover:bg-background-2 cursor-pointer"
          @click="selectOption(option)">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dropdownIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { RequestTaskDropdownProps } from '@/types/user'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { placeholderText, options, labelName, modelValue, isLabel, disabled, isInvalidate } =
  defineProps<RequestTaskDropdownProps>()
const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: string) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}

const { htmlRef } = useOutsideClick(() => dropdownOpen.value && toggleDropdown())
</script>
