<template>
  <div
    class="filter-container"
    :style="{ width: width ? `${width}px` : '' }"
    :class="width === 'full' && 'grow'">
    <span class="filter-title">{{ title }}</span>
    <div
      ref="htmlRef"
      class="filter-dropdown"
      @click="toggleDropdown">
      <span class="grow text-center">선택 ({{ (value as string[]).length }})</span>
      <CommonIcons :name="dropdownIcon" />
      <ul
        @click.stop
        v-if="isDropdownOpened"
        class="filter-dropdown-option-list">
        <li
          class="filter-dropdown-option"
          v-for="option in optionList"
          :key="option.value"
          :class="
            (value as string[]).includes(option.value)
              ? 'bg-primary1 text-white font-semibold'
              : 'hover:bg-background-2'
          "
          @click="() => onOptionClick(option.value)">
          {{ option.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dropdownIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { Filter } from '@/types/common'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { title, width = '120', optionList, value } = defineProps<Filter>()
const emit = defineEmits(['update:value'])

const isDropdownOpened = ref(false)
const toggleDropdown = () => (isDropdownOpened.value = !isDropdownOpened.value)

const onOptionClick = (option: string | number) => {
  emit('update:value', option)
}

const { htmlRef } = useOutsideClick(() => isDropdownOpened.value && toggleDropdown())
</script>
