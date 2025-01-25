<template>
  <div
    class="w-full max-w-80 border-l-8 bg-white py-4 pl-6 pr-4 flex flex-col gap-6 rounded-lg shadow-custom hover:bg-background-2"
    :class="borderLeft"
    @click="onTaskClick">
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center gap-4">
        <span class="text-black">{{ title }}</span>
        <CommonIcons :name="bentoIcon" />
      </div>
      <span class="text-xs text-body">{{ mainCategoryName }} - {{ categoryName }}</span>
    </div>
    <div class="flex justify-between items-end">
      <span class="text-xs font-bold text-black">{{ taskCode }}</span>
      <div class="flex flex-col gap-1 items-end">
        <span class="text-xs font-bold text-body">{{ requesterTeam }}</span>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded-full bg-background-1 overflow-hidden">
            <img :src="requesterImg" />
          </div>
          <span class="text-xs font-bold text-black">{{ requesterName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bentoIcon } from '@/constants/iconPath'
import CommonIcons from '../common/CommonIcons.vue'
import type { Status } from '@/types/common'
import { computed } from 'vue'
import { statusAsColor } from '@/utils/statusAsColor'
import type { TaskCardProps } from '@/types/manager'

const { title, mainCategoryName, categoryName, taskCode, requesterName, requesterTeam, status } =
  defineProps<TaskCardProps>()

const borderLeft = computed(() => {
  return `border-${statusAsColor(status as Status)}-1`
})

const onTaskClick = () => {
  console.log('clicked')
}
</script>
