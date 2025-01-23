<template>
  <div class="list-card">
    <ListCardTab
      v-for="info in myRequestInfoList"
      :key="info.content"
      :content="info.content"
      :width="info.width"
      :is-text-xs="info.isTextXs"
      :profile-img="info.profileImg"
      :is-status="info.isStatus" />
  </div>
</template>

<script setup lang="ts">
import type { MyRequestListInfo } from '@/types/user'
import ListCardTab from '../ListCardTab.vue'
import type { ListCardInfo } from '@/types/common'

const { info } = defineProps<{ info: MyRequestListInfo }>()
const myRequestInfoList: ListCardInfo[] = [
  { content: info.taskCode, width: 120, isTextXs: true },
  { content: info.requestedAt, width: 80 },
  { content: info.mainCategoryName, width: 80 },
  { content: info.categoryName, width: 80 },
  { content: info.title },
  { content: info.processorName, width: 120, profileImg: info.processorImg },
  { content: info.taskStatus, width: 64, isStatus: true },
  { content: info.finishedAt, width: 80 }
]
</script>
