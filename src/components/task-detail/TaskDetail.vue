<template>
  <div class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-50 p-12">
    <div
      class="flex flex-col overflow-y-auto rounded-lg w-full max-w-[1200px] min-w-[1024px] bg-white p-6">
      <TaskDetailTopBar
        :is-approved="data?.taskStatus !== 'REQUESTED'"
        :close-task-detail="closeTaskDetail"
        :id="data?.taskId || 0"
        :isProcessor="data?.processorNickName === info.nickname || info.role === 'ROLE_MANAGER'"
        :isRequestor="data?.requesterNickName === info.nickname" />
      <div
        class="w-full flex gap-6"
        v-if="data">
        <div class="w-full h-[718px] flex flex-col gap-y-8 overflow-y-auto scrollbar-hide">
          <TaskDetailLeft :data="data" />
          <div class="w-full h-[1px] bg-border-1 shrink-0"></div>
          <TaskDetailHistory
            :historyData="historyData?.histories || []"
            :task-id="selectedId"
            :requestor-name="data.requesterNickName" />
        </div>
        <div class="w-[1px] bg-border-1"></div>
        <TaskDetailRight
          :data
          :isProcessor="data?.processorNickName === info.nickname" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHistory, getTaskDetailManager, getTaskDetailUser } from '@/api/user'
import { useMemberStore } from '@/stores/member'
import type { TaskDetailDatas, TaskDetailHistoryData, TaskDetailProps } from '@/types/user'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import TaskDetailHistory from './TaskDetailHistory.vue'
import TaskDetailLeft from './TaskDetailLeft.vue'
import TaskDetailRight from './TaskDetailRight.vue'
import TaskDetailTopBar from './TaskDetailTopBar.vue'

const { closeTaskDetail, selectedId } = defineProps<TaskDetailProps>()

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const { data } = useQuery<TaskDetailDatas>({
  queryKey: ['taskDetailUser', selectedId],
  queryFn:
    info.value.role === 'ROLE_USER'
      ? () => getTaskDetailUser(selectedId)
      : () => getTaskDetailManager(selectedId)
})

const { data: historyData } = useQuery<TaskDetailHistoryData>({
  queryKey: ['historyData', selectedId],
  queryFn: () => getHistory(selectedId)
})
</script>
