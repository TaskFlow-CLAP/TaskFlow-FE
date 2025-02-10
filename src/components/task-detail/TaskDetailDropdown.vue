<template>
  <div
    ref="htmlRef"
    class="relative flex">
    <div
      class="task-detail-dropdown"
      @click="toggleDropdown">
      <div class="flex gap-2">
        <div class="w-6 h-6 rounded-full overflow-hidden">
          <img
            src="/images/mockProfile.jpg"
            alt="userProfile" />
        </div>
        <p class="text-black">
          {{ modelValue }}
        </p>
      </div>
      <CommonIcons
        :name="dropdownIcon"
        :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
    </div>
    <div
      v-if="dropdownOpen"
      class="task-detail-dropdown-option-list">
      <div
        v-for="option in options"
        :key="option"
        class="task-detail-dropdown-option justify-between"
        @click="selectOption(option)">
        <div class="flex gap-2 items-center">
          <div class="w-6 h-6 rounded-full overflow-hidden">
            <img
              :src="processor.profileUrl"
              alt="userProfile" />
          </div>
          <p class="text-sm">
            {{ option }}
          </p>
        </div>
        <p class="text-primary1 text-xs">잔여 작업 : {{ 3 }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dropdownIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { TaskDetailDropdownProps } from '@/types/user'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { options, modelValue, processor } = defineProps<TaskDetailDropdownProps>()
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
