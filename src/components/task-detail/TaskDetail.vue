<template>
  <div
    :onClick="closeTaskDetail"
    class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-50 p-12" />
  <div
    class="flex flex-col overflow-y-auto rounded-lg w-[calc(100%-96px)] max-w-[1104px] h-[calc(100%-96px)] bg-white shadow-custom py-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
    <TaskDetailTopBar
      v-if="data"
      :is-approved="data.taskStatus !== 'REQUESTED'"
      :close-task-detail="closeTaskDetail"
      :id="data?.taskId || 0"
      :isReviewer="info.isReviewer"
      :isRequestor="data?.requesterNickName === info.nickname" />
    <div
      v-if="data"
      class="w-full flex relative overflow-y-auto">
      <div class="w-full flex flex-col gap-y-8 overflow-y-auto scrollbar-hide p-6">
        <TaskDetailLeft :data="data" />
        <div class="w-full h-[1px] bg-border-1 shrink-0"></div>
        <TaskDetailHistory
          :historyData="historyData?.histories || []"
          :task-id="selectedId"
          :requestor-name="data.requesterNickName" />
      </div>
      <div class="w-[1px] bg-border-1"></div>
      <TaskDetailRight
        :data="data"
        :isProcessor="info.role !== 'ROLE_USER'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHistory, getTaskDetailManager, getTaskDetailUser } from '@/api/user'
import { useIsOverlayOpenStore } from '@/stores/isOverlayOpen'
import { useMemberStore } from '@/stores/member'
import type { TaskDetailDatas, TaskDetailHistoryData, TaskDetailProps } from '@/types/user'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'
import TaskDetailHistory from './TaskDetailHistory.vue'
import TaskDetailLeft from './TaskDetailLeft.vue'
import TaskDetailRight from './TaskDetailRight.vue'
import TaskDetailTopBar from './TaskDetailTopBar.vue'

const { closeTaskDetail, selectedId } = defineProps<TaskDetailProps>()

const memberStore = useMemberStore()
const { info, isLogined } = storeToRefs(memberStore)

const { data } = useQuery<TaskDetailDatas>({
  queryKey: ['taskDetailUser', selectedId],
  queryFn:
    info.value.role === 'ROLE_USER'
      ? () => getTaskDetailUser(selectedId)
      : () => getTaskDetailManager(selectedId),
  refetchOnMount: 'always',
  staleTime: 0
})
console.log(data, '최 앞단')

const { data: historyData } = useQuery<TaskDetailHistoryData>({
  queryKey: ['historyData', selectedId],
  queryFn: () => getHistory(selectedId),
  enabled: isLogined
})

const { setIsOverlayOpen } = useIsOverlayOpenStore()
onMounted(() => {
  setIsOverlayOpen(true)
})
onUnmounted(() => {
  setIsOverlayOpen(false)
})
</script>
