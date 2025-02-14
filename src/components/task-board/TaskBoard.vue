<template>
  <div class="grow">
    <div class="w-full h-full grid grid-cols-3 gap-12 overflow-hidden">
      <div class="grow shrink-0 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="data?.tasksInProgress.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-semibold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="tasksInProgress"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'IN_PROGRESS')"
          :disabled="isDetailOpen">
          <template #item="{ element }">
            <div>
              <TaskCard
                :key="element.taskId"
                :data="element"
                @toggle-modal="isDetailOpen = !isDetailOpen"
                draggable />
            </div>
          </template>
        </draggableComponent>
      </div>

      <div class="grow shrink-0 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="data?.tasksInReviewing.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-semibold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="tasksInReviewing"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'IN_REVIEWING')"
          :disabled="isDetailOpen">
          <template #item="{ element }">
            <div>
              <TaskCard
                :key="element.taskId"
                :data="element"
                @toggle-modal="isDetailOpen = !isDetailOpen"
                draggable />
            </div>
          </template>
        </draggableComponent>
      </div>

      <div class="grow shrink-0 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="data?.tasksCompleted.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-semibold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="tasksCompleted"
          group="taskList"
          item-key="task"
          class="flex flex-col gap-4 h-full"
          @change="event => onListChange(event, 'COMPLETED')"
          :disabled="isDetailOpen">
          <template #item="{ element }">
            <div>
              <TaskCard
                :key="element.taskId"
                :data="element"
                @toggle-modal="isDetailOpen = !isDetailOpen"
                draggable />
            </div>
          </template>
        </draggableComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Status } from '@/types/common'
import type { DraggableEvent, TaskCardList } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { useQueryClient } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import draggableComponent from 'vuedraggable'
import TaskCard from '../common/TaskCard.vue'

const { data } = defineProps<{ data?: TaskCardList }>()

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
    const prevTaskId = (data && data[key!][targetIndex - 1]?.taskId) || 0
    const targetTaskId = event.added.element.taskId
    const nextTaskId = (data && data[key!][targetIndex])?.taskId || 0
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
      prevTaskId = (data && data[key!][newIndex]?.taskId) || 0
      nextTaskId = (data && data[key!][newIndex + 1]?.taskId) || 0
    } else {
      prevTaskId = (data && data[key!][newIndex - 1]?.taskId) || 0
      nextTaskId = (data && data[key!][newIndex]?.taskId) || 0
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

const tasksInProgress = computed(() => [...(data?.tasksInProgress || [])])
const tasksInReviewing = computed(() => [...(data?.tasksInReviewing || [])])
const tasksCompleted = computed(() => [...(data?.tasksCompleted || [])])

const isDetailOpen = ref(false)
</script>
