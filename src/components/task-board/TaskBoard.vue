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
          검토 중 {{ data?.tasksInReviewing.length }}
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
          :list="tasksInProgress"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'IN_PROGRESS')">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element"
              draggable />
          </template>
        </draggableComponent>
      </div>

      <div class="flex-1 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="data?.tasksInReviewing.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-bold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="tasksInReviewing"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'IN_REVIEWING')">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element"
              draggable />
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
          :list="tasksCompleted"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'COMPLETED')">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element"
              draggable />
          </template>
        </draggableComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/member'
import { useTaskBoardParamsStore } from '@/stores/params'
import type { Status } from '@/types/common'
import type { DraggableEvent, TaskCardList } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import draggableComponent from 'vuedraggable'
import { useParseParams } from '../hooks/useParseParams'
import TaskCard from '../TaskCard.vue'

const queryClient = useQueryClient()

const statusToKey = (status: Status): keyof TaskCardList | undefined => {
  if (status === 'IN_PROGRESS') {
    return 'tasksInProgress'
  } else if (status === 'IN_REVIEWING') {
    return 'tasksInReviewing'
  } else if (status === 'COMPLETED') {
    return 'tasksCompleted'
  }
}

const onListChange = async (event: DraggableEvent, status: Status) => {
  if (event.added) {
    const key = statusToKey(status)
    const targetIndex = event.added.newIndex
    const prevTaskId = (data.value && data.value[key!][targetIndex - 1]?.taskId) || 0
    const targetTaskId = event.added.element.taskId
    const nextTaskId = (data.value && data.value[key!][targetIndex])?.taskId || 0
    const body = {
      prevTaskId,
      targetTaskId,
      nextTaskId
    }
    await axiosInstance.patch('/api/task-board', body, { params: { status } })
    queryClient.invalidateQueries({ queryKey: ['taskBoard'] })
  }
  if (event.moved) {
    const key = statusToKey(status)
    const [oldIndex, newIndex] = [event.moved.oldIndex, event.moved.newIndex]
    const targetTaskId = event.moved.element.taskId
    let [prevTaskId, nextTaskId] = [0, 0]
    if (oldIndex < newIndex) {
      prevTaskId = (data.value && data.value[key!][newIndex]?.taskId) || 0
      nextTaskId = (data.value && data.value[key!][newIndex + 1]?.taskId) || 0
    } else {
      prevTaskId = (data.value && data.value[key!][newIndex - 1]?.taskId) || 0
      nextTaskId = (data.value && data.value[key!][newIndex]?.taskId) || 0
    }
    const body = {
      prevTaskId,
      targetTaskId,
      nextTaskId
    }
    await axiosInstance.patch('/api/task-board', body)
    queryClient.invalidateQueries({ queryKey: ['taskBoard'] })
  }
}

const { params } = useTaskBoardParamsStore()
const fetchTaskBoard = async () => {
  const { parseBoardParams } = useParseParams()
  const parsedParams = parseBoardParams(params)
  const response = await axiosInstance.get('/api/task-board', { params: parsedParams })
  return response.data
}
const { isLogined } = useMemberStore()
const { data } = useQuery<TaskCardList>({
  queryKey: ['taskBoard', params],
  queryFn: fetchTaskBoard,
  enabled: isLogined
})

const tasksInProgress = computed(() => [...(data.value?.tasksInProgress || [])])
const tasksInReviewing = computed(() => [...(data.value?.tasksInReviewing || [])])
const tasksCompleted = computed(() => [...(data.value?.tasksCompleted || [])])
</script>
