<template>
  <div>
    <div class="flex text-xs gap-x-1 mb-2">
      <p class="text-body font-bold">2차 카테고리</p>
      <p class="text-red-1">*</p>
    </div>
    <div class="relative flex text-base">
      <div
        class="flex w-full h-11 items-center rounded p-4 bg-white border border-border-1 cursor-pointer"
        @click="toggleDropdown">
        <p>
          {{ selectedOption }}
        </p>
      </div>
      <div
        v-if="dropdownOpen"
        class="absolute w-full h-40 overflow-y-auto top-[52px] flex flex-col gap-2 p-2 bg-white rounded z-10 shadow">
        <div
          v-for="option in props.options"
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
import type { RequestTaskDropdownProps } from '@/types/user'
import { ref } from 'vue'

const props = defineProps<RequestTaskDropdownProps>()

const dropdownOpen = ref(false)
const selectedOption = ref(props.placeholderText)
// const filter = ref('filter-icon')

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: string) => {
  selectedOption.value = option
  dropdownOpen.value = false
}
</script>

<style scoped></style>
