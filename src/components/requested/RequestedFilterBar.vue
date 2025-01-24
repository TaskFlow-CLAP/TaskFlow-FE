<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="조회 기간"
      :width="120"
      :option-list="TERM_LIST"
      :value="String(params.term)"
      @update:value="onTermChange" />
    <FilterCategory
      :category-list="DUMMY_CATEGORY_LIST"
      :main="params.mainCategoryId"
      :sub="params.categoryId"
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
    <FilterDropdown
      title="페이지 당 개수"
      :width="120"
      :option-list="PAGE_SIZE_LIST"
      :value="String(params.pageSize)"
      @update:value="value => (params.pageSize = Number(value))" />
  </div>
</template>

<script setup lang="ts">
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterInput from '../filters/FilterInput.vue'
import { useMyRequestParamsStore } from '@/stores/params'
import { DUMMY_CATEGORY_LIST } from '@/datas/dummy'
import { PAGE_SIZE_LIST, TERM_LIST } from '@/constants/common'

const { params } = useMyRequestParamsStore()

const onTermChange = (value: string) => {
  if (value === '') {
    params.term = ''
  }
  params.term = Number(value)
}
const onMainChange = (value: number) => {
  if (params.mainCategoryId.includes(value)) {
    params.mainCategoryId = [...params.mainCategoryId].filter(el => el !== value)
  } else {
    params.mainCategoryId.push(value)
  }
}
const onSubChange = (value: number) => {
  if (params.categoryId.includes(value)) {
    params.categoryId = [...params.categoryId].filter(el => el !== value)
  } else {
    params.categoryId.push(value)
  }
}
</script>
