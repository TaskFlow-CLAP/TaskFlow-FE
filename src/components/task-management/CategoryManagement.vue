<template>
  <div class="flex flex-col w-full min-h-[480px] border border-border-1 rounded-lg">
    <div class="flex w-full">
      <div class="task-management-title rounded-tl-lg">
        <p>고유코드</p>
        <p>1차 카테고리</p>
      </div>
      <div class="w-0.5 bg-border-1"></div>
      <div class="task-management-title rounded-tr-lg">
        <p>고유코드</p>
        <p>2차 카테고리</p>
      </div>
    </div>
    <div class="flex w-full">
      <CategoryLineMain
        :mainCategory="mockCategoryAllData.mainCategory"
        :subCategory="mockCategoryAllData.subCategory" />
      <div class="bg-border-1 w-0.5"></div>
      <CategoryLineSub
        :mainCategory="mockCategoryAllData.mainCategory"
        :subCategory="mockCategoryAllData.subCategory" />
    </div>
    <div class="text-xs text-disabled gap-1 category-management-line justify-center cursor-pointer">
      <p>새 1차 카테고리 추가</p>
      <CommonIcons :name="plusIcon" />
    </div>
    <div class="mt-4">
      <CategoryList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { plusIcon } from '@/constants/iconPath'
import { mockCategoryAllData } from '@/datas/taskmanagement'
import CommonIcons from '../common/CommonIcons.vue'
import CategoryLineMain from './CategoryLineMain.vue'
import CategoryLineSub from './CategoryLineSub.vue'
</script>
