<template>
  <div class="max-w-1200 flex flex-col !pt-0 min-h-screen">
    <div class="w-full flex flex-col gap-6 sticky top-[64px] pt-6 bg-white z-40">
      <TitleBar title="작업 보드" />

      <TaskBoardFilterBar />

      <div class="w-full grid grid-cols-3 gap-12 sticky top-0 bg-white z-30">
        <div class="flex bg-primary2 rounded-t-lg">
          <span class="text-xs font-semibold text-body p-4">
            진행 중 {{ data?.tasksInProgress.length }}
          </span>
        </div>
        <div class="flex bg-primary2 rounded-t-lg">
          <span class="text-xs font-semibold text-body p-4">
            검토 중 {{ data?.tasksInReviewing.length }}
          </span>
        </div>
        <div class="flex bg-primary2 rounded-t-lg">
          <span class="text-xs font-semibold text-body p-4">
            완료 {{ data?.tasksCompleted.length }}
          </span>
        </div>
      </div>
    </div>

    <div class="pt-16 flex grow">
      <TaskBoard :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import TaskBoard from '@/components/task-board/TaskBoard.vue'
import TaskBoardFilterBar from '@/components/task-board/TaskBoardFilterBar.vue'
import { useParseParams } from '@/hooks/useParseParams'
import { useMemberStore } from '@/stores/member'
import { useTaskBoardParamsStore } from '@/stores/params'
import type { TaskCardList } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'

const { params } = useTaskBoardParamsStore()
const fetchTaskBoard = async () => {
  const { parseBoardParams } = useParseParams()
  const parsedParams = parseBoardParams(params)
  const response = await axiosInstance.get('/api/task-board', { params: parsedParams })
  return response.data
}
const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)

const { data } = useQuery<TaskCardList>({
  queryKey: ['taskBoard', params],
  queryFn: fetchTaskBoard,
  enabled: isLogined
})
</script>
