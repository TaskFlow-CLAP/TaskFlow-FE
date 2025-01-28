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
      :category-list="DUMMY_CATEGORY_LIST"
      :main="params.mainCategoryId"
      :sub="params.categoryId"
      @update:main="onParamsChange.onMainChange"
      @update:sub="onParamsChange.onSubChange" />
  </div>
</template>

<script setup lang="ts">
import { DUMMY_CATEGORY_LIST } from '@/datas/dummy'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'
import { useTeamBoardParamsStore } from '@/stores/params'
import { useTeamBoardParamsChange } from '../hooks/useTeamBoardParamsChange'

const { params } = useTeamBoardParamsStore()

const onParamsChange = useTeamBoardParamsChange()
</script>
