<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="조회 기간"
      :width="120"
      :option-list="TERM_LIST"
      :value="params.term"
      @update:value="value => (params.term = value)" />
    <FilterDropdownMulti
      title="1차 카테고리"
      :option-list="MAIN_CATEGORY_LIST"
      :value="params.mainCategory"
      @update:value="
        (value: string) => {
          if (params.mainCategory.includes(value)) {
            params.mainCategory = [...params.mainCategory].filter(el => el !== value)
          } else {
            params.mainCategory.push(value)
          }
        }
      " />
    <FilterDropdownMulti
      title="2차 카테고리"
      :option-list="CATEGORY_LIST"
      :value="params.category"
      @update:value="
        (value: string) => {
          if (params.category.includes(value)) {
            params.category = [...params.category].filter(el => el !== value)
          } else {
            params.category.push(value)
          }
        }
      " />
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
      @update:value="
        (value: string) => {
          if (params.taskStatus.includes(value)) {
            params.taskStatus = [...params.taskStatus].filter(el => el !== value)
          } else {
            params.taskStatus.push(value)
          }
        }
      " />
    <FilterDropdown
      title="페이지 당 개수"
      :width="120"
      :option-list="PAGE_SIZE_LIST"
      :value="params.pageSize"
      @update:value="value => (params.pageSize = value)" />
  </div>
</template>

<script setup lang="ts">
import {
  CATEGORY_LIST,
  MAIN_CATEGORY_LIST,
  PAGE_SIZE_LIST,
  TASK_STATUS_LIST,
  TERM_LIST
} from '@/constants/user'
import FilterDropdown from '../FilterDropdown.vue'
import FilterDropdownMulti from '../FilterDropdownMulti.vue'
import FilterInput from '../FilterInput.vue'
import { ref } from 'vue'
import type { ParamsMyRequest } from '@/types/user'

const params = ref<ParamsMyRequest>({
  term: '전체',
  mainCategory: [],
  category: [],
  title: '',
  nickName: '',
  taskStatus: [],
  pageSize: '20'
})
</script>
