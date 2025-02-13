<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2">
      <p class="text-disabled font-semibold">담당자 변경</p>
      <p class="text-red-1">*</p>
      <p
        v-if="isInvalidateState === 'manager'"
        class="text-red-1">
        담당자를 선택해주세요
      </p>
    </div>
    <div
      ref="htmlRef"
      class="relative flex">
      <div
        class="request-task-dropdown"
        :class="isInvalidateState ? '!border-red-1' : ''"
        @click="toggleDropdown">
        <div class="flex gap-2 items-center">
          <ImageContainer
            :size="24"
            :url="modelValue?.imageUrl" />
          <p :class="{ 'text-disabled': !modelValue }">
            {{ modelValue?.nickname || placeholderText }}
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
          <div class="flex gap-2">
            <ImageContainer
              :size="24"
              :url="option.imageUrl" />
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
import { getManager } from '@/api/user'
import { dropdownIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { ManagerTypes } from '@/types/manager'
import type { ManagerDropdownProps } from '@/types/user'
import { computed, onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ImageContainer from '../common/ImageContainer.vue'

const { placeholderText, modelValue, isInvalidate } = defineProps<ManagerDropdownProps>()
const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)
const managerArr = ref<ManagerTypes[]>([])
const isInvalidateState = computed(() => isInvalidate)

onMounted(async () => {
  emit('update:modelValue', null)
  managerArr.value = await getManager()
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: ManagerTypes) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}

const { htmlRef } = useOutsideClick(() => dropdownOpen.value && toggleDropdown())
</script>
