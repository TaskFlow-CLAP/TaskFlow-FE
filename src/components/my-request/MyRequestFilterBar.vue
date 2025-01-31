<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="조회 기간"
      :option-list="TERM_LIST"
      :value="String(store.params.filterTaskListRequest.term)"
      @update:value="onParamsChange.onTermChange" />
    <FilterCategory
      :category-list="data"
      :main="store.params.filterTaskListRequest.mainCategoryId"
      :sub="store.params.filterTaskListRequest.categoryId"
      @update:main="onParamsChange.onMainChange"
      @update:sub="onParamsChange.onSubChange" />
    <FilterInput
      title="제목"
      :value="store.params.filterTaskListRequest.title"
      @update:value="onParamsChange.onTitleChange" />
    <FilterInput
      title="처리자"
      :value="store.params.filterTaskListRequest.nickName"
      @update:value="onParamsChange.onNickNameChange" />
    <FilterDropdownMulti
      title="상태"
      :option-list="TASK_STATUS_LIST"
      :value="store.params.filterTaskListRequest.taskStatus!"
      @update:value="onParamsChange.onTaskStatusChange" />
    <FilterDropdown
      title="페이지 당 개수"
      :option-list="PAGE_SIZE_LIST"
      :value="String(store.params.pageSize)"
      @update:value="onParamsChange.onPageSizeChange" />
  </div>
</template>

<script setup lang="ts">
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterInput from '../filters/FilterInput.vue'
import FilterDropdownMulti from '../filters/FilterDropdownMulti.vue'
import { useRequestParamsStore } from '@/stores/params'
import { PAGE_SIZE_LIST, TASK_STATUS_LIST, TERM_LIST } from '@/constants/common'
import { useRequestParamsChange } from '../hooks/useRequestParamsChange'
import axiosInstance from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'

const store = useRequestParamsStore()
store.$reset()

const onParamsChange = useRequestParamsChange()

const fetchCategory = async () => {
  const response = await axiosInstance.get('/api/category')
  return response.data
}

const { data } = useQuery({
  queryKey: ['category'],
  queryFn: fetchCategory
})

console.log(data.value)
</script>
