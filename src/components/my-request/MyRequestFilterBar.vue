<template>
  <div class="flex gap-4 z-30">
    <FilterDropdown
      title="조회 기간"
      :option-list="TERM_LIST"
      :value="String(store.params.term)"
      @update:value="onParamsChange.onTermChange" />
    <FilterCategory
      :category-list="data"
      :main="store.params.mainCategoryIds"
      :sub="store.params.categoryIds"
      @update:main="onParamsChange.onMainChange"
      @update:sub="onParamsChange.onSubChange" />
    <FilterInput
      title="제목"
      :value="store.params.title"
      @update:value="onParamsChange.onTitleChange" />
    <FilterInput
      title="담당자"
      :value="store.params.nickName"
      @update:value="onParamsChange.onNickNameChange" />
    <FilterDropdownMulti
      title="상태"
      :option-list="TASK_STATUS_LIST"
      :value="store.params.taskStatus!"
      @update:value="onParamsChange.onTaskStatusChange" />
    <FilterDropdown
      title="페이지 당 개수"
      :option-list="PAGE_SIZE_LIST"
      :value="String(store.params.pageSize)"
      @update:value="onParamsChange.onPageSizeChange" />
  </div>
</template>

<script setup lang="ts">
import { PAGE_SIZE_LIST, TASK_STATUS_LIST, TERM_LIST } from '@/constants/common'
import { useRequestParamsStore } from '@/stores/params'
import { useQuery } from '@tanstack/vue-query'
import FilterCategory from '../filters/FilterCategory.vue'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterDropdownMulti from '../filters/FilterDropdownMulti.vue'
import FilterInput from '../filters/FilterInput.vue'
import { getCategory } from '@/api/common'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { useRequestParamsChange } from '@/hooks/useRequestParamsChange'

const store = useRequestParamsStore()
store.$reset()

const onParamsChange = useRequestParamsChange()

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery({
  queryKey: ['category'],
  queryFn: getCategory,
  enabled: isLogined
})
</script>
