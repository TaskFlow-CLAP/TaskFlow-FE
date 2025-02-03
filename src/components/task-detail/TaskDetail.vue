<template>
  <div class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-50">
    <div
      class="flex flex-col overflow-y-auto rounded-lg w-full max-w-[1200px] min-w-[1024px] bg-white p-6">
      <TaskDetailTopBar
        :is-approved="isApproved"
        :close-task-detail="closeTaskDetail" />
      <div
        class="w-full flex gap-6"
        v-if="data">
        <div class="w-full h-[718px] flex flex-col gap-y-8 overflow-y-auto scrollbar-hide">
          <TaskDetailLeft :data="data" />
          <div class="w-full border-border-1 border"></div>
          <TaskDetailHistory
            :history="DUMMY_TASK_DETAIL_HISTORY"
            :is-approved="false" />
        </div>
        <div class="w-[1px] bg-border-1"></div>
        <TaskDetailRight :data />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTaskDetailUser } from '@/api/user'
import * as taskDetailData from '@/datas/taskdetail'
import type { TaskDetailDatas, TaskDetailProps } from '@/types/user'
import { useQuery } from '@tanstack/vue-query'
import TaskDetailHistory from './TaskDetailHistory.vue'
import TaskDetailLeft from './TaskDetailLeft.vue'
import TaskDetailRight from './TaskDetailRight.vue'
import TaskDetailTopBar from './TaskDetailTopBar.vue'

const { DUMMY_TASK_DETAIL_HISTORY } = taskDetailData
const { isApproved, closeTaskDetail, selectedId } = defineProps<TaskDetailProps>()

const { data } = useQuery<TaskDetailDatas>({
  queryKey: ['taskDetailUser', selectedId],
  queryFn: () => getTaskDetailUser(selectedId)
})
</script>
