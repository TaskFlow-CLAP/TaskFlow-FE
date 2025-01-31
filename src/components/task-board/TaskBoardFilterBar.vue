<template>
  <div class="flex gap-4 z-40">
    <FilterDropdown
      title="구분"
      :option-list="DUMMY_DIVISION_LIST"
      :value="params.division"
      @update:value="onDivisionChange" />
    <FilterCategory
      :category-list="DUMMY_CATEGORY_LIST"
      :main="params.mainCategoryId"
      :sub="params.categoryId"
      @update:main="onMainChange"
      @update:sub="onSubChange" />
    <FilterInput
      title="제목"
      :value="params.title"
      @update:value="onTitleChange" />
    <FilterInput
      title="요청자"
      :value="params.nickName"
      @update:value="onNickNameChange" />
  </div>
</template>

<script setup lang="ts">
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterInput from '../filters/FilterInput.vue'
import { DUMMY_CATEGORY_LIST, DUMMY_DIVISION_LIST } from '@/datas/dummy'
import { useTaskBoardParamsStore } from '@/stores/params'

const { params } = useTaskBoardParamsStore()

const onArrayChange = <Value extends number | string>(array: Value[], value: Value) => {
  return array.includes(value) ? array.filter(el => el !== value) : [...array, value]
}

const onDivisionChange = (value: string) => {
  params.division = value
}
const onMainChange = (value: number) => {
  params.mainCategoryId = onArrayChange(params.mainCategoryId, value)
}
const onSubChange = (value: number) => {
  params.categoryId = onArrayChange(params.categoryId, value)
}
const onNickNameChange = (value: string) => {
  params.nickName = value
}
const onTitleChange = (value: string) => {
  params.title = value
}
</script>
