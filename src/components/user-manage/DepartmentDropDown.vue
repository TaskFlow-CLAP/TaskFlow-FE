<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2 text-red-1">
      <p class="text-body font-bold">부서</p>
      <p>*</p>
      <p v-if="isInvalidateState === 'reviewer'">담당자 권한이 없는 부서입니다</p>
    </div>
    <div class="relative flex">
      <div
        class="flex w-full h-11 items-center rounded p-4 border border-border-1 bg-white text-black cursor-pointer"
        @click="toggleDropdown()">
        <p>
          {{ dePartments.find(department => department.departmentId === modelValue)?.name }}
        </p>
        <CommonIcons
          :name="dropdownIcon"
          :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
      </div>
      <div
        v-if="dropdownOpen"
        class="absolute w-full h-40 overflow-y-auto top-[52px] flex flex-col gap-2 p-2 bg-white rounded z-10 shadow border-t border-t-border-2 text-black">
        <div
          v-for="department in dePartments"
          :key="department.departmentId"
          class="w-full flex items-center h-11 p-2 rounded hover:bg-background-2 cursor-pointer"
          @click="selectOption(department)">
          {{ department.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDepartmentsAdmin } from '@/api/admin'
import { dropdownIcon } from '@/constants/iconPath'
import type { DepartmentType } from '@/types/admin'
import { computed, onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const dePartments = ref<DepartmentType[]>([])
const dropdownOpen = ref(false)
const emit = defineEmits(['update:modelValue'])
const { modelValue, isInvalidate } = defineProps<{ modelValue: number; isInvalidate: string }>()
const isInvalidateState = computed(() => isInvalidate)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: DepartmentType) => {
  emit('update:modelValue', option.departmentId)
  dropdownOpen.value = false
}

onMounted(async () => {
  try {
    dePartments.value = await getDepartmentsAdmin()
  } catch (error) {
    console.error('부서가져오기 실패:', error)
  }
})
</script>
