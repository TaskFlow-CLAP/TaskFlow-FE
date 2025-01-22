<template>
  <div
    class="filter-container"
    :style="{ width: widthStyle }"
    :class="!width && 'grow'">
    <span class="filter-title">{{ title }}</span>
    <div
      class="flex justify-center items-center w-full h-8 border-b border-border-1 relative text-xs text-black"
      @click="toggleDropdown">
      선택
      <ul
        @click.stop
        v-if="isDropdownOpened"
        class="w-full max-h-[120px] overflow-y-scroll position absolute left-0 top-[calc(100%+8px)] shadow-custom p-2 flex flex-col gap-2 rounded">
        <li
          class="text-xs text-black p-2 rounded text-center"
          v-for="option in optionList"
          :key="option"
          :class="
            (value as string).includes(option)
              ? 'bg-primary1 text-white font-bold'
              : 'hover:bg-background-2'
          "
          @click="() => onOptionClick(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Filter } from '@/types/user'
import { computed, ref } from 'vue'

const { title, width, optionList, value } = defineProps<Filter>()
const emit = defineEmits(['update:value'])

const widthStyle = computed(() => {
  return width ? `${width}px` : ''
})

const isDropdownOpened = ref(false)
const toggleDropdown = () => (isDropdownOpened.value = !isDropdownOpened.value)

const onOptionClick = (option: string) => {
  emit('update:value', option)
}
</script>
