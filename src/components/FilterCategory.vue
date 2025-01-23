<template>
  <div class="flex gap-4 grow">
    <div class="filter-container grow">
      <span class="filter-title">1차 카테고리</span>
      <div
        class="flex justify-center items-center w-full h-8 border-b border-border-1 relative text-xs text-black"
        @click="toggleDropdown('main')">
        선택
        <ul
          @click.stop
          v-if="isMainOpened"
          class="w-full max-h-[120px] overflow-y-scroll position absolute left-0 top-[calc(100%+8px)] shadow-custom p-2 flex flex-col gap-2 rounded">
          <li
            class="text-xs text-black p-2 rounded text-center"
            v-for="category in categoryList"
            :key="category.value"
            :class="
              (main as number[]).includes(category.value)
                ? 'bg-primary1 text-white font-bold'
                : 'hover:bg-background-2'
            "
            @click="() => onMainClick(category)">
            {{ category.content }}
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-container grow">
      <span class="filter-title">2차 카테고리</span>
      <div
        class="flex justify-center items-center w-full h-8 border-b border-border-1 relative text-xs text-black"
        :class="isDisabled ? 'bg-background-2 text-disabled' : 'text-black'"
        @click="!isDisabled && toggleDropdown('sub')">
        선택
        <ul
          @click.stop
          v-if="isSubOpened"
          class="w-full max-h-[120px] overflow-y-scroll position absolute left-0 top-[calc(100%+8px)] shadow-custom p-2 flex flex-col gap-2 rounded">
          <ul
            class="flex flex-col gap-2"
            v-for="category in selectedCategoryList"
            :key="category.content">
            <div class="w-full flex items-center gap-2">
              <div class="h-[1px] grow bg-border-2" />
              <span class="text-[10px] font-bold text-disabled">
                {{ category.content }}
              </span>
              <div class="h-[1px] grow bg-border-2" />
            </div>
            <li
              class="text-xs text-black p-2 rounded text-center"
              v-for="subCategory in category.subCategoryList"
              :key="subCategory.value"
              :class="
                (sub as number[]).includes(subCategory.value)
                  ? 'bg-primary1 text-white font-bold'
                  : 'hover:bg-background-2'
              "
              @click="() => onSubClick(subCategory.value)">
              {{ subCategory.content }}
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, FilterCategory } from '@/types/common'
import { computed, watchEffect } from 'vue'
import { ref } from 'vue'

const { categoryList, main, sub } = defineProps<FilterCategory>()
const emit = defineEmits(['update:main', 'update:sub'])

const isMainOpened = ref(false)
const isSubOpened = ref(false)
const toggleDropdown = (type: 'main' | 'sub') =>
  type === 'main'
    ? (isMainOpened.value = !isMainOpened.value)
    : (isSubOpened.value = !isSubOpened.value)

const selectedCategoryList = ref<{ content: string; subCategoryList: Category[] }[]>([])
const isDisabled = computed(() => {
  return selectedCategoryList.value.length === 0
})
watchEffect(() => {
  if (isDisabled.value) isSubOpened.value = false
})

const onMainClick = (category: Category) => {
  if (selectedCategoryList.value.map(el => el.content).includes(category.content)) {
    selectedCategoryList.value = [...selectedCategoryList.value].filter(
      el => el.content !== category.content
    )
    if (category.subCategoryList) {
      category.subCategoryList.forEach(el => {
        if ((sub as number[]).includes(el.value)) {
          emit('update:sub', el.value)
        }
      })
    }
  } else {
    if (category.subCategoryList) {
      selectedCategoryList.value.push({
        content: category.content,
        subCategoryList: category.subCategoryList
      })
    }
  }
  emit('update:main', category.value)
}
const onSubClick = (value: number) => {
  emit('update:sub', value)
}
</script>

<style scoped></style>
