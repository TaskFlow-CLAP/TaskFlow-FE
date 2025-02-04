<template>
  <div class="flex gap-4 z-40">
    <FilterDropdown
      title="구분"
      :option-list="labelOptionList"
      :value="String(params.labelId)"
      @update:value="onLabelIdChange" />
    <FilterCategory
      :category-list="categoryList"
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
      :value="params.requesterNickname"
      @update:value="onRequesterNicknameChange" />
  </div>
</template>

<script setup lang="ts">
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterInput from '../filters/FilterInput.vue'
import { useTaskBoardParamsStore } from '@/stores/params'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { LabelResponse } from '@/types/common'
import { getCategory, getLabels } from '@/api/common'

const { params } = useTaskBoardParamsStore()

const onArrayChange = <Value extends number | string>(array: Value[], value: Value) => {
  return array.includes(value) ? array.filter(el => el !== value) : [...array, value]
}

const onLabelIdChange = (value: string) => {
  if (value === '') params.labelId = ''
  else params.labelId = Number(value)
}
const onMainChange = (value: number) => {
  params.mainCategoryIds = onArrayChange(params.mainCategoryIds, value)
}
const onSubChange = (value: number) => {
  params.categoryIds = onArrayChange(params.categoryIds, value)
}
const onRequesterNicknameChange = (value: string) => {
  params.requesterNickname = value
}
const onTitleChange = (value: string) => {
  params.title = value
}

const { data: categoryList } = useQuery({
  queryKey: ['category'],
  queryFn: getCategory
})

const { data: labelList } = useQuery<LabelResponse[]>({
  queryKey: ['label'],
  queryFn: getLabels
})
const labelOptionList = computed(() => {
  const list = [{ value: '', content: '전체' }]
  labelList.value?.forEach(el => list.push({ value: String(el.labelId), content: el.labelName }))
  return list
})
</script>
