<template>
  <div
    class="filter-container"
    :style="{ width: width ? `${width}px` : '' }"
    :class="!width && 'grow'">
    <span class="filter-title">{{ title }}</span>
    <div
      class="filter-dropdown"
      @click="toggleDropdown">
      선택
      <ul
        @click.stop
        v-if="isDropdownOpened"
        class="filter-dropdown-option-list">
        <li
          class="filter-dropdown-option"
          v-for="option in optionList"
          :key="option"
          :class="
            (value as string).includes(option)
              ? 'bg-primary1 text-white font-bold'
              : 'hover:bg-background-2 text-black'
          "
          @click="() => onOptionClick(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Filter } from '@/types/common'
import { ref } from 'vue'

const { title, width, optionList, value } = defineProps<Filter>()
const emit = defineEmits(['update:value'])

const isDropdownOpened = ref(false)
const toggleDropdown = () => (isDropdownOpened.value = !isDropdownOpened.value)

const onOptionClick = (option: string) => {
  emit('update:value', option)
}
</script>
