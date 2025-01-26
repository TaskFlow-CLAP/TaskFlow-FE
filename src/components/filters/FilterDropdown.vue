<template>
  <div
    class="filter-container"
    :style="{ width: width ? `${width}px` : '' }"
    :class="width === 'full' && 'grow'">
    <span class="filter-title">{{ title }}</span>
    <div
      class="filter-dropdown"
      @click="toggleDropdown">
      <span class="grow text-center">{{
        optionList?.filter(el => el.value === value)[0].content
      }}</span>
      <CommonIcons :name="dropdownIcon" />
      <ul
        @click.stop
        v-if="isDropdownOpened"
        class="filter-dropdown-option-list">
        <li
          class="filter-dropdown-option hover:bg-background-2 text-black"
          v-for="option in optionList"
          :key="option.value"
          @click="() => onOptionClick(option.value)">
          {{ option.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Filter } from '@/types/common'
import { ref } from 'vue'
import { dropdownIcon } from '@/constants/iconPath'
import CommonIcons from '../common/CommonIcons.vue'

const { title, value, width = '120', optionList } = defineProps<Filter>()
const emit = defineEmits(['update:value'])

const isDropdownOpened = ref(false)
const toggleDropdown = () => (isDropdownOpened.value = !isDropdownOpened.value)

const onOptionClick = (option: string) => {
  emit('update:value', option)
  toggleDropdown()
}
</script>
