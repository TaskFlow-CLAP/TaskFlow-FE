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
import { getCategory, getLabels } from '@/api/common'
import { useMemberStore } from '@/stores/member'
import { useTaskBoardParamsStore } from '@/stores/params'
import type { LabelDataTypes } from '@/types/common'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'

const { params, $reset } = useTaskBoardParamsStore()
$reset()

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

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data: categoryList } = useQuery({
  queryKey: ['category'],
  queryFn: getCategory,
  enabled: isLogined
})

const { data: labelList } = useQuery<LabelDataTypes[]>({
  queryKey: ['label'],
  queryFn: getLabels,
  enabled: isLogined
})
const labelOptionList = computed(() => {
  const list = [{ value: '', content: '전체' }]
  labelList.value?.forEach(el => list.push({ value: String(el.labelId), content: el.labelName }))
  return list
})
</script>
