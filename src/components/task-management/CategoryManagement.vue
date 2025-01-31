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
      <CategoryLine :categories="mockCategoryAllData.categories" />
      <CategoryLineSub :categories="mockCategoryAllData.categories" />
      <div class="bg-border-1 w-0.5"></div>
    </div>
    <div
      class="text-xs text-disabled font-bold gap-1 category-management-line justify-center cursor-pointer"
      @click="MovetoAddCategory">
      <CommonIcons :name="plusIcon" />
      <p>새 1차 카테고리 추가</p>
    </div>
    <div class="mt-4">
      <CategoryList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { plusIcon } from '@/constants/iconPath'
import { mockCategoryAllData } from '@/datas/taskmanagement'
import { useRouter } from 'vue-router'
import CommonIcons from '../common/CommonIcons.vue'
import CategoryLine from './CategoryLine.vue'
import CategoryLineSub from './CategoryLineSub.vue'

const router = useRouter()

const MovetoAddCategory = () => {
  router.push({ name: 'AddCategory' })
}
</script>
