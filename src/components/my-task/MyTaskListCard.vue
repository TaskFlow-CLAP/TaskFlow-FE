<template>
  <div class="list-card">
    <ListCardTab
      v-for="tab in myRequestTabList"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :is-text-xs="tab.isTextXs"
      :profile-img="tab.profileImg"
      :is-status="tab.isStatus" />
  </div>
</template>

<script setup lang="ts">
import type { ListCardProps } from '@/types/common'
import ListCardTab from '../lists/ListCardTab.vue'
import type { MyTaskListData } from '@/types/manager'

const { info } = defineProps<{ info: MyTaskListData }>()
const myRequestTabList: ListCardProps[] = [
  { content: info.taskCode, width: 120, isTextXs: true },
  { content: info.requestedAt, width: 80 },
  { content: info.mainCategoryName, width: 80 },
  { content: info.categoryName, width: 80 },
  { content: info.title },
  { content: info.requesterName, width: 120, profileImg: info.requesterImg },
  { content: info.taskStatus, width: 64, isStatus: true },
  { content: info.finishedAt, width: 80 }
]
</script>
