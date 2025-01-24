<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="조회 기간"
      :width="120"
      :option-list="TERM_LIST"
      :value="String(params.term)"
      @update:value="value => (params.term = Number(value))" />
    <FilterCategory
      :category-list="DUMMY_CATEGORY_LIST"
      :main="params.mainCategory"
      :sub="params.category"
      @update:main="onMainChange"
      @update:sub="onSubChange" />
    <FilterInput
      title="제목"
      :width="120"
      :value="params.title"
      @update:value="value => (params.title = value)" />
    <FilterInput
      :width="120"
      title="처리자"
      :value="params.nickName"
      @update:value="value => (params.nickName = value)" />
    <FilterDropdownMulti
      title="상태"
      :width="120"
      :option-list="TASK_STATUS_LIST"
      :value="params.taskStatus"
      @update:value="onTaskStatusClick" />
    <FilterDropdown
      title="페이지 당 개수"
      :width="120"
      :option-list="PAGE_SIZE_LIST"
      :value="String(params.pageSize)"
      @update:value="value => (params.pageSize = Number(value))" />
  </div>
</template>

<script setup lang="ts">
import { PAGE_SIZE_LIST, TASK_STATUS_LIST, TERM_LIST } from '@/constants/user'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterInput from '../filters/FilterInput.vue'
import FilterDropdownMulti from '../filters/FilterDropdownMulti.vue'
import { useMyRequestParamsStore } from '@/stores/params'
import { DUMMY_CATEGORY_LIST } from '@/datas/dummy'

const { params } = useMyRequestParamsStore()

const onMainChange = (value: number) => {
  if (params.mainCategory.includes(value)) {
    params.mainCategory = [...params.mainCategory].filter(el => el !== value)
  } else {
    params.mainCategory.push(value)
  }
}
const onSubChange = (value: number) => {
  if (params.category.includes(value)) {
    params.category = [...params.category].filter(el => el !== value)
  } else {
    params.category.push(value)
  }
}
const onTaskStatusClick = (value: string) => {
  if (params.taskStatus.includes(value)) {
    params.taskStatus = [...params.taskStatus].filter(el => el !== value)
  } else {
    params.taskStatus.push(value)
  }
}
</script>
