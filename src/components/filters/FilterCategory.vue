<template>
  <div class="flex gap-4 grow">
    <div class="filter-container grow">
      <span class="filter-title">1차 카테고리</span>
      <div
        ref="mainRef"
        class="filter-dropdown"
        @click="toggleDropdown('main')">
        <span class="grow text-center">선택 ({{ (main as number[]).length }})</span>
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
            :key="category.mainCategoryId"
            :class="
              (main as number[]).includes(category.mainCategoryId)
                ? 'bg-primary1 text-white font-semibold'
                : 'hover:bg-background-2'
            "
            @click="() => onMainClick(category)">
            {{ category.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-container grow">
      <span class="filter-title">2차 카테고리</span>
      <div
        ref="subRef"
        class="filter-dropdown"
        :class="isDisabled ? 'bg-background-2 text-disabled' : ''"
        @click="!isDisabled && toggleDropdown('sub')">
        <span class="grow text-center">선택 ({{ (sub as number[]).length }})</span>
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
            :key="category.name">
            <div class="w-full flex items-center gap-2">
              <div class="h-[1px] grow bg-border-2" />
              <span class="text-[10px] font-semibold text-disabled">
                {{ category.name }}
              </span>
              <div class="h-[1px] grow bg-border-2" />
            </div>
            <li
              class="filter-dropdown-option"
              v-for="subCategory in category.subCategory"
              :key="subCategory.subCategoryId"
              :class="
                (sub as number[]).includes(subCategory.subCategoryId)
                  ? 'bg-primary1 text-white font-semibold'
                  : 'hover:bg-background-2'
              "
              @click="() => onSubClick(subCategory.subCategoryId)">
              {{ subCategory.name }}
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dropdownIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { Category, FilterCategoryProps, SubCategory } from '@/types/common'
import { computed, ref, watchEffect } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { categoryList = [], main, sub } = defineProps<FilterCategoryProps>()
const emit = defineEmits(['update:main', 'update:sub'])

const isMainOpened = ref(false)
const isSubOpened = ref(false)
const toggleDropdown = (type: 'main' | 'sub') =>
  type === 'main'
    ? (isMainOpened.value = !isMainOpened.value)
    : (isSubOpened.value = !isSubOpened.value)

const selectedCategoryList = ref<{ name: string; subCategory: SubCategory[] }[]>([])
const isDisabled = computed(() => {
  return selectedCategoryList.value.length === 0
})
watchEffect(() => {
  if (isDisabled.value) isSubOpened.value = false
})

const onMainClick = (category: Category) => {
  if (selectedCategoryList.value.map(el => el.name).includes(category.name)) {
    selectedCategoryList.value = [...selectedCategoryList.value].filter(
      el => el.name !== category.name
    )
    if (category.subCategory) {
      category.subCategory.forEach(el => {
        if ((sub as number[]).includes(el.subCategoryId)) {
          emit('update:sub', el.subCategoryId)
        }
      })
    }
  } else {
    if (category.subCategory) {
      selectedCategoryList.value.push({
        name: category.name,
        subCategory: category.subCategory
      })
    }
  }
  emit('update:main', category.mainCategoryId)
}
const onSubClick = (value: number) => {
  emit('update:sub', value)
}

const { htmlRef: mainRef } = useOutsideClick(() => isMainOpened.value && toggleDropdown('main'))
const { htmlRef: subRef } = useOutsideClick(() => isSubOpened.value && toggleDropdown('sub'))
</script>
