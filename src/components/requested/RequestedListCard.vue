<template>
  <div class="list-card">
    <ListCardTab
      v-for="tab in requestedTabList"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :is-text-xs="tab.isTextXs"
      :profile-img="tab.profileImg"
      :is-status="tab.isStatus" />
    <div class="w-[120px] flex gap-2 justify-center">
      <button
        @click="router.push(`/assign/${info.taskId}`)"
        class="button-medium-primary">
        승인
      </button>
      <button class="button-medium-default">거부</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ListCardProps } from '@/types/common'
import ListCardTab from '../lists/ListCardTab.vue'
import type { RequestedListData } from '@/types/manager'
import { useRouter } from 'vue-router'

const { info } = defineProps<{ info: RequestedListData }>()
const requestedTabList: ListCardProps[] = [
  { content: info.requestedAt, width: 80 },
  { content: info.mainCategoryName, width: 80 },
  { content: info.categoryName, width: 80 },
  { content: info.title },
  { content: info.requesterName, width: 120, profileImg: info.requesterImg }
]

const router = useRouter()
</script>
