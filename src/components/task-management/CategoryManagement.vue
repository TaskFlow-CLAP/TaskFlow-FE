<template>
  <div
    class="flex flex-col w-full h-[480px] border border-border-1 rounded-lg bg-background-1 overflow-hidden">
    <div class="flex w-full">
      <div class="task-management-title rounded-tl-lg">
        <p>작업코드</p>
        <p>1차 카테고리</p>
      </div>
      <div class="w-0.5 bg-border-1"></div>
      <div class="task-management-title rounded-tr-lg">
        <p>작업코드</p>
        <p>2차 카테고리</p>
      </div>
    </div>
    <div class="flex flex-col w-full grow overflow-y-auto scrollbar-hide">
      <div class="flex">
        <CategoryLine :categories="data || []" />
        <div class="bg-border-1 w-0.5"></div>
        <CategoryLineSub :categories="data || []" />
      </div>
      <div
        class="text-xs text-disabled font-semibold gap-1 shrink-0 category-management-line justify-center cursor-pointer bg-white !border-b-0 hover:bg-background-2"
        @click="MovetoAddCategory">
        <CommonIcons :name="plusIcon" />
        <p>새 1차 카테고리 추가</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategory } from '@/api/common'
import { plusIcon } from '@/constants/iconPath'
import { useMemberStore } from '@/stores/member'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import CommonIcons from '../common/CommonIcons.vue'
import CategoryLine from './CategoryLine.vue'
import CategoryLineSub from './CategoryLineSub.vue'

const router = useRouter()

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data } = useQuery({
  queryKey: ['category'],
  queryFn: getCategory,
  enabled: isLogined
})

const MovetoAddCategory = () => {
  router.push('/category-first')
}
</script>
