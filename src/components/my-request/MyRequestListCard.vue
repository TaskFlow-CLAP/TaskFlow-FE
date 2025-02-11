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
    v-if="selectedID"
    :is-approved="info.taskStatus !== 'REQUESTED'"
    :selected-id="selectedID"
    :close-task-detail="() => handleModal(null)" />
</template>

<script setup lang="ts">
import { useRequestParamsStore } from '@/stores/params'
import type { ListCardProps } from '@/types/common'
import type { MyRequestListData } from '@/types/user'
import { formatDate } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import ListCardTab from '../lists/ListCardTab.vue'
import TaskDetail from '../task-detail/TaskDetail.vue'

const { info } = defineProps<{ info: MyRequestListData }>()
const selectedID = ref<number | null>(null)
const { params } = useRequestParamsStore()
const queryClient = useQueryClient()

const handleModal = (id: number | null) => {
  if (!id) {
    queryClient.invalidateQueries({
      queryKey: ['myRequest', params]
    })
  }
  selectedID.value = id
}

const myRequestTabList: ListCardProps[] = [
  { content: info.taskCode, width: 120, isTextXs: true },
  { content: formatDate(info.requestedAt), width: 80 },
  { content: info.mainCategoryName, width: 80 },
  { content: info.categoryName, width: 80 },
  { content: info.title },
  { content: info.processorName, width: 120, profileImg: info.processorImg },
  { content: info.taskStatus, width: 64, isStatus: true },
  { content: info.finishedAt ? formatDate(info.finishedAt) : '', width: 80 }
]
</script>
