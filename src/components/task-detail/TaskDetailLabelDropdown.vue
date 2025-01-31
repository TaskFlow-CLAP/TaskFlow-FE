<template>
  <div>
    <div class="relative flex">
      <div
        class="task-detail-dropdown"
        @click="toggleDropdown">
        <div class="flex gap-2">
          <div class="w-6 h-6 rounded-full border-red-1 border-2 bg-red-2"></div>
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
          :key="option.labelId"
          class="task-detail-dropdown-option justify-between"
          @click="selectOption(option.labelName)">
          <div class="flex gap-2 items-center">
            <div
              class="w-6 h-6 rounded-full overflow-hidden"
              :style="{ border: `2px solid ${option.labelColor}` }"></div>
            <p class="text-sm">
              {{ option.labelName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dropdownIcon } from '@/constants/iconPath'
import type { TaskDetailLabelDropdownProps } from '@/types/user'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { options, modelValue } = defineProps<TaskDetailLabelDropdownProps>()
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
