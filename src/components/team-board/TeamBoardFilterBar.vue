<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="정렬"
      :option-list="[
        { value: 'CONTRIBUTE', content: '기여도순' },
        { value: 'DEFAULT', content: '이름순' }
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
import { getCategory } from '@/api/common'
import { useTeamBoardParamsChange } from '@/hooks/useTeamBoardParamsChange'
import { useMemberStore } from '@/stores/member'
import { useTeamBoardParamsStore } from '@/stores/params'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'

const { params, $reset } = useTeamBoardParamsStore()
$reset()

const onParamsChange = useTeamBoardParamsChange()

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery({
  queryKey: ['category'],
  queryFn: getCategory,
  enabled: isLogined
})
</script>
