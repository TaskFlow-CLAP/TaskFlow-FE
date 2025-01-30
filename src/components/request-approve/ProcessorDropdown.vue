<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2">
      <p class="text-body font-bold">{{ labelName }}</p>
      <p class="text-red-1">*</p>
    </div>
    <div class="relative flex text-base">
      <div
        class="request-task-dropdown"
        @click="toggleDropdown">
        <p :class="{ 'text-body': modelValue === placeholderText }">
          {{ modelValue || placeholderText }}
        </p>
        <CommonIcons
          :name="dropdownIcon"
          :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
      </div>
      <div
        v-if="dropdownOpen"
        class="request-task-dropdown-option-list">
        <div
          v-for="option in options"
          :key="option"
          class="request-task-dropdown-option justify-between"
          @click="selectOption(option)">
          <div class="flex gap-2">
            <div class="w-6 h-6 rounded-full overflow-hidden">
              <img
                src="/images/mockProfile.jpg"
                alt="userProfile" />
            </div>
            <p>
              {{ option }}
            </p>
          </div>
          <p class="text-primary1 text-xs">잔여 작업 : {{ 3 }}</p>
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

const { placeholderText, options, labelName, modelValue } = defineProps<RequestTaskDropdownProps>()
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
