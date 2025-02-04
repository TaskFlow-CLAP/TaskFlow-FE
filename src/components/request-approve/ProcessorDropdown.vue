<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2">
      <p class="text-disabled font-bold">담당자 변경</p>
      <p class="text-red-1">*</p>
    </div>
    <div class="relative flex text-base">
      <div
        class="request-task-dropdown"
        @click="toggleDropdown">
        <p :class="{ 'text-disabled': !modelValue }">
          {{ modelValue?.nickname || placeholderText }}
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
          :key="option.memberId"
          class="request-task-dropdown-option justify-between"
          @click="selectOption(option)">
          <div class="flex gap-2">
            <div class="w-6 h-6 rounded-full overflow-hidden">
              <img
                :src="option.imageUrl || '/images/mockProfile.jpg'"
                alt="userProfile" />
            </div>
            <p>
              {{ option.nickname }}
            </p>
          </div>
          <p class="text-primary1 text-xs">잔여 작업 : {{ option.remainingTasks }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dropdownIcon } from '@/constants/iconPath'
import type { ManagerTypes } from '@/types/manager'
import type { ProcessorDropdownProps } from '@/types/user'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { placeholderText, options, modelValue } = defineProps<ProcessorDropdownProps>()
const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: ManagerTypes) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}
</script>
