<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="정렬"
      :option-list="[
        { value: '기여도순', content: '기여도순' },
        { value: '이름순', content: '이름순' }
      ]"
      :value="params.sortBy"
      @update:value="onParamsChange.onSortByChange" />
    <FilterInput
      title="제목"
      :value="''"
      @update:value="onParamsChange.onTaskTitleChange" />
    <FilterCategory
      :category-list="data"
      :main="params.mainCategoryIds"
      :sub="params.categoryIds"
      @update:main="onParamsChange.onMainChange"
      @update:sub="onParamsChange.onSubChange" />
  </div>
</template>

<script setup lang="ts">
import { useTeamBoardParamsStore } from '@/stores/params'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'
import { useTeamBoardParamsChange } from '../hooks/useTeamBoardParamsChange'

const { params } = useTeamBoardParamsStore()

const onParamsChange = useTeamBoardParamsChange()

const fetchCategory = async () => {
  const response = await axiosInstance.get('/api/category')
  return response.data
}

const { data } = useQuery({
  queryKey: ['category'],
  queryFn: fetchCategory
})
</script>
