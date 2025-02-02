<template>
  <div class="flex gap-4 z-40">
    <FilterDropdown
      title="구분"
      :option-list="DUMMY_DIVISION_LIST"
      :value="params.division"
      @update:value="onDivisionChange" />
    <FilterCategory
      :category-list="data"
      :main="params.mainCategoryIds"
      :sub="params.categoryIds"
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
import { DUMMY_DIVISION_LIST } from '@/datas/dummy'
import { useTaskBoardParamsStore } from '@/stores/params'
import { useQuery } from '@tanstack/vue-query'
import axiosInstance from '@/utils/axios'

const { params } = useTaskBoardParamsStore()

const onArrayChange = <Value extends number | string>(array: Value[], value: Value) => {
  return array.includes(value) ? array.filter(el => el !== value) : [...array, value]
}

const onDivisionChange = (value: string) => {
  params.division = value
}
const onMainChange = (value: number) => {
  params.mainCategoryIds = onArrayChange(params.mainCategoryIds, value)
}
const onSubChange = (value: number) => {
  params.categoryIds = onArrayChange(params.categoryIds, value)
}
const onNickNameChange = (value: string) => {
  params.nickName = value
}
const onTitleChange = (value: string) => {
  params.title = value
}

const fetchCategory = async () => {
  const response = await axiosInstance.get('/api/category')
  return response.data
}

const { data } = useQuery({
  queryKey: ['category'],
  queryFn: fetchCategory
})
</script>
