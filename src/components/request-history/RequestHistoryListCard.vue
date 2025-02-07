<template>
  <div
    class="list-card"
    @click="handleModal(info.taskId)">
    <ListCardTab
      v-for="tab in myRequestTabList"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :is-text-xs="tab.isTextXs"
      :profile-img="tab.profileImg"
      :is-status="tab.isStatus" />
  </div>
  <TaskDetail
    :is-approved="info.taskStatus !== 'REQUESTED'"
    :selected-id="selectedID"
    :close-task-detail="() => handleModal(null)" />
</template>

<script setup lang="ts">
import type { ListCardProps } from '@/types/common'
import type { RequestHistoryListData } from '@/types/manager'
import { formatDate } from '@/utils/date'
import { ref } from 'vue'
import ListCardTab from '../lists/ListCardTab.vue'
import TaskDetail from '../task-detail/TaskDetail.vue'

const { info } = defineProps<{ info: RequestHistoryListData }>()
const selectedID = ref<number | null>(null)

const handleModal = (id: number | null) => {
  if (id) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
  selectedID.value = id
}
const myRequestTabList: ListCardProps[] = [
  { content: info.taskCode, width: 120, isTextXs: true },
  { content: formatDate(info.requestedAt), width: 80 },
  { content: info.mainCategoryName, width: 80 },
  { content: info.categoryName, width: 80 },
  { content: info.title },
  { content: info.requesterName, width: 120, profileImg: info.requesterImg },
  { content: info.processorName, width: 120, profileImg: info.processorImg },
  { content: info.taskStatus, width: 64, isStatus: true },
  { content: info.finishedAt ? formatDate(info.finishedAt) : '', width: 80 }
]
</script>
