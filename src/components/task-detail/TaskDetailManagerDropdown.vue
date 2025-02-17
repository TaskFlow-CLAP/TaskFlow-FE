<template>
  <div
    ref="htmlRef"
    class="relative flex">
    <div
      class="task-detail-manager-dropdown"
      @click="toggleDropdown">
      <div class="flex gap-2 items-center">
        <ImageContainer
          :url="modelValue?.imageUrl"
          :size="20" />
        <p :class="['text-sm', { 'text-disabled': !modelValue?.nickname }]">
          {{ modelValue?.nickname || '담당자를 선택해주세요' }}
        </p>
      </div>
      <CommonIcons
        :name="dropdownIcon"
        :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
    </div>
    <div
      v-if="dropdownOpen"
      class="request-task-dropdown-option-list">
      <div
        v-for="option in managerArr"
        :key="option.memberId"
        class="request-task-dropdown-option justify-between"
        @click="selectOption(option)">
        <div class="flex gap-2 items-center text-sm">
          <ImageContainer
            :url="option.imageUrl"
            :size="20" />
          <p>
            {{ option.nickname }}
          </p>
        </div>
        <p class="text-primary1 text-xs">잔여 작업 : {{ option.remainingTasks }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getManager } from '@/api/user'
import { dropdownIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { ManagerTypes } from '@/types/manager'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ImageContainer from '../common/ImageContainer.vue'

const { modelValue } = defineProps<{ modelValue: ManagerTypes; taskId: number }>()
const emit = defineEmits(['update:modelValue'])
console.log(modelValue, '현재 담당ㅏ자')

const dropdownOpen = ref(false)
const managerArr = ref<ManagerTypes[]>([])

const fetchManagerData = async () => {
  managerArr.value = await getManager()
}

const toggleDropdown = async () => {
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) {
    await fetchManagerData()
  }
}

const selectOption = (option: ManagerTypes) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}

const { htmlRef } = useOutsideClick(() => dropdownOpen.value && toggleDropdown())
</script>
