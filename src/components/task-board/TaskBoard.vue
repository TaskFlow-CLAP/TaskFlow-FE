<template>
  <div class="flex-1 overflow-y-auto">
    <div class="w-full flex gap-12 sticky top-0 bg-white z-30">
      <div class="flex flex-1 bg-primary2 rounded-t-lg">
        <span class="text-xs font-bold text-body p-4">
          진행 중 {{ data?.tasksInProgress.length }}
        </span>
      </div>
      <div class="flex flex-1 bg-primary2 rounded-t-lg">
        <span class="text-xs font-bold text-body p-4">
          검토 중 {{ data?.tasksPendingComplete.length }}
        </span>
      </div>
      <div class="flex flex-1 bg-primary2 rounded-t-lg">
        <span class="text-xs font-bold text-body p-4">
          완료 {{ data?.tasksCompleted.length }}
        </span>
      </div>
    </div>

    <div class="w-full flex gap-12 min-h-[calc(100%-48px)]">
      <div class="flex-1 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="data?.tasksInProgress.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-bold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="data?.tasksInProgress"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'tasksInProgress')">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element" />
          </template>
        </draggableComponent>
      </div>

      <div class="flex-1 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="data?.tasksPendingComplete.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-bold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="data?.tasksPendingComplete"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'tasksPendingComplete')">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element" />
          </template>
        </draggableComponent>
      </div>

      <div class="flex-1 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="data?.tasksCompleted.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-bold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="data?.tasksCompleted"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'tasksCompleted')">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element" />
          </template>
        </draggableComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggableComponent from 'vuedraggable'
import TaskCard from '../TaskCard.vue'
import type { DraggableEvent, TaskCardList } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { useParseParams } from '../hooks/useParseParams'
import { useTaskBoardParamsStore } from '@/stores/params'
import { useQuery } from '@tanstack/vue-query'

const status = {
  tasksInProgress: '진행 중',
  tasksPendingComplete: '검토 중',
  tasksCompleted: '완료'
}

// const onListChange = (event: DraggableEvent, key: keyof typeof status) => {
//   const { added } = event
//   if (added) {
//     cardList.value[key][added.newIndex].taskStatus = status[key]
//   }
// }

const { params } = useTaskBoardParamsStore()
const fetchTaskBoard = async () => {
  const { parseBoardParams } = useParseParams()
  const parsedParams = parseBoardParams(params)
  const response = await axiosInstance.get('/api/task-board', { params: parsedParams })
  return response.data
}
const { data } = useQuery<TaskCardList>({
  queryKey: ['taskBoard', params],
  queryFn: fetchTaskBoard
})
</script>
