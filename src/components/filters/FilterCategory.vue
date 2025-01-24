<template>
  <div class="flex gap-4 grow">
    <div class="filter-container grow">
      <span class="filter-title">1차 카테고리</span>
      <div
        class="filter-dropdown"
        @click="toggleDropdown('main')">
        <span class="grow text-center">선택</span>
        <CommonIcons
          :name="dropdownIcon"
          :style="{ fill: '#18181B' }" />
        <ul
          @click.stop
          v-if="isMainOpened"
          class="filter-dropdown-option-list">
          <li
            class="filter-dropdown-option"
            v-for="category in categoryList"
            :key="category.id"
            :class="
              (main as number[]).includes(category.id)
                ? 'bg-primary1 text-white font-bold'
                : 'hover:bg-background-2 text-black'
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
        class="filter-dropdown"
        :class="isDisabled ? 'bg-background-2 text-disabled' : 'text-black'"
        @click="!isDisabled && toggleDropdown('sub')">
        <span class="grow text-center">선택</span>
        <CommonIcons
          :name="dropdownIcon"
          :style="{ fill: isDisabled ? '#A1A1AA' : '#18181B' }" />
        <ul
          @click.stop
          v-if="isSubOpened"
          class="filter-dropdown-option-list">
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
              class="filter-dropdown-option"
              v-for="subCategory in category.subCategoryList"
              :key="subCategory.id"
              :class="
                (sub as number[]).includes(subCategory.id)
                  ? 'bg-primary1 text-white font-bold'
                  : 'hover:bg-background-2 text-black'
              "
              @click="() => onSubClick(subCategory.id)">
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
import CommonIcons from '../CommonIcons.vue'
import { dropdownIcon } from '@/constants/iconPath'

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
        if ((sub as number[]).includes(el.id)) {
          emit('update:sub', el.id)
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
  emit('update:main', category.id)
}
const onSubClick = (value: number) => {
  emit('update:sub', value)
}
</script>

<style scoped></style>
