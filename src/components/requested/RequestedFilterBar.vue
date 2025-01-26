<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="조회 기간"
      :option-list="TERM_LIST"
      :value="String(store.params.term)"
      @update:value="onParamsChange.onTermChange" />
    <FilterCategory
      :category-list="DUMMY_CATEGORY_LIST"
      :main="store.params.mainCategoryId"
      :sub="store.params.categoryId"
      @update:main="onParamsChange.onMainChange"
      @update:sub="onParamsChange.onSubChange" />
    <FilterInput
      title="제목"
      :value="store.params.title"
      @update:value="onParamsChange.onTitleChange" />
    <FilterInput
      title="처리자"
      :value="store.params.nickName"
      @update:value="onParamsChange.onNickNameChange" />
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
import { DUMMY_CATEGORY_LIST } from '@/datas/dummy'
import { PAGE_SIZE_LIST, TERM_LIST } from '@/constants/common'
import { useRequestParamsStore } from '@/stores/params'
import { useRequestParamsChange } from '../hooks/useRequestParamsChange'

const store = useRequestParamsStore()
store.$reset()

const onParamsChange = useRequestParamsChange()
</script>
