<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="정렬"
      :width="120"
      :option-list="[
        { value: 'CONTRIBUTION', content: '기여도순' },
        { value: 'NAME', content: '이름순' }
      ]"
      :value="'CONTRIBUTION'"
      @update:value="() => {}" />
    <FilterInput
      title="제목"
      :width="120"
      :value="''"
      @update:value="() => {}" />
    <!-- <FilterCategory
      :category-list="DUMMY_CATEGORY_LIST"
      :main="params.mainCategoryId"
      :sub="params.categoryId"
      @update:main="onMainChange"
      @update:sub="onSubChange" /> -->
  </div>
</template>

<script setup lang="ts">
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'
</script>
