<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2">
      <p class="text-body font-bold">{{ labelName }}</p>
      <p
        v-if="!isLabel"
        class="text-red-1">
        *
      </p>
    </div>
    <div class="relative flex text-base">
      <div
        class="flex w-full h-11 items-center rounded p-4 bg-white border border-border-1 cursor-pointer text-black"
        @click="toggleDropdown">
        <p :class="{ 'text-disabled': modelValue === placeholderText }">
          {{ modelValue || placeholderText }}
        </p>
        <CommonIcons
          :name="dropdownIcon"
          :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
      </div>
      <div
        v-if="dropdownOpen"
        class="absolute w-full h-40 overflow-y-auto top-[52px] flex flex-col gap-2 p-2 bg-white rounded z-10 shadow border-t border-t-border-2 text-black">
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
import type { RequestTaskDropdownProps } from '@/types/user'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { placeholderText, options, labelName, modelValue, isLabel } =
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
</script>
