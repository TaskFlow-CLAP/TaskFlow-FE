<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2">
      <p class="text-disabled font-bold">담당자 변경</p>
      <p class="text-red-1">*</p>
      <p
        v-if="isInvalidateState === 'manager'"
        class="text-red-1">
        담당자를 선택해주세요
      </p>
    </div>
    <div class="relative flex text-base">
      <div
        class="request-task-dropdown"
        @click="toggleDropdown">
        <div class="flex gap-2 items-center">
          <div
            v-if="modelValue"
            class="w-6 h-6 rounded-full overflow-hidden">
            <img
              :src="modelValue?.imageUrl || '/images/mockProfile.jpg'"
              alt="userProfile" />
          </div>
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
import { getManager } from '@/api/user'
import { dropdownIcon } from '@/constants/iconPath'
import type { ManagerTypes } from '@/types/manager'
import type { ManagerDropdownProps } from '@/types/user'
import { computed, onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { placeholderText, modelValue, isInvalidate } = defineProps<ManagerDropdownProps>()
const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)
const managerArr = ref<ManagerTypes[]>([])
const isInvalidateState = computed(() => isInvalidate)

onMounted(async () => {
  managerArr.value = await getManager()
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: ManagerTypes) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}
</script>
