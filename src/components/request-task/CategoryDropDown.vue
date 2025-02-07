<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2">
      <p class="text-body font-bold">{{ labelName }}</p>
      <p
        v-if="!isLabel"
        class="text-red-1">
        *
      </p>
      <p
        v-if="isInvalidateState === 'category'"
        class="text-red-1">
        카테고리를 선택해주세요
      </p>
    </div>
    <div
      ref="htmlRef"
      class="relative flex">
      <div
        class="flex w-full h-11 items-center rounded p-4 border border-border-1 cursor-pointer text-black"
        :class="isDisabled ? 'bg-background-2' : 'bg-white'"
        @click="toggleDropdown">
        <p :class="{ 'text-disabled': !modelValue?.name }">
          {{ modelValue?.name ?? labelName + '를 선택해주세요' }}
        </p>
        <CommonIcons
          :name="dropdownIcon"
          :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
      </div>
      <div
        v-if="dropdownOpen"
        class="absolute w-full max-h-40 overflow-y-auto top-[52px] flex flex-col gap-2 p-2 bg-white rounded z-10 shadow border-t border-t-border-2 text-black">
        <div
          v-for="option in options"
          :key="option.id"
          class="w-full flex items-center h-11 p-2 rounded hover:bg-background-2 cursor-pointer"
          @click="selectOption(option)">
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dropdownIcon } from '@/constants/iconPath'
import type { Category, CategoryDropdownProps } from '@/types/common'
import { computed, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import { useOutsideClick } from '../hooks/useOutsideClick'

const { options, labelName, modelValue, isLabel, isDisabled, isInvalidate } =
  defineProps<CategoryDropdownProps>()

const isInvalidateState = computed(() => isInvalidate)

const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)

const toggleDropdown = () => {
  if (isDisabled) return
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: Category) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}

const { htmlRef } = useOutsideClick(() => dropdownOpen.value && toggleDropdown())
</script>
