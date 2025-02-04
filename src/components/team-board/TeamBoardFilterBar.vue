<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="정렬"
      :option-list="[
        { value: 'CONTRIBUTION', content: '기여도순' },
        { value: 'NAME', content: '이름순' }
      ]"
      :value="params.order"
      @update:value="onParamsChange.onOrderChange" />
    <FilterInput
      title="제목"
      :value="''"
      @update:value="onParamsChange.onTitleChange" />
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
import { useQuery } from '@tanstack/vue-query'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'
import { useTeamBoardParamsChange } from '../hooks/useTeamBoardParamsChange'
import { getCategory } from '@/api/common'

const { params } = useTeamBoardParamsStore()

const onParamsChange = useTeamBoardParamsChange()

const { data } = useQuery({
  queryKey: ['category'],
  queryFn: getCategory
})
</script>
