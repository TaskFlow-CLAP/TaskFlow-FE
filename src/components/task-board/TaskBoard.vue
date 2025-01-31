<template>
  <div class="flex-1 overflow-y-auto">
    <div class="w-full flex gap-12 sticky top-0 bg-white z-40">
      <div class="flex flex-1 bg-primary2 rounded-t-lg">
        <span class="text-xs font-bold text-body p-4">
          진행 중 {{ cardList.tasksInProgress.length }}
        </span>
      </div>
      <div class="flex flex-1 bg-primary2 rounded-t-lg">
        <span class="text-xs font-bold text-body p-4">
          검토 중 {{ cardList.tasksPendingComplete.length }}
        </span>
      </div>
      <div class="flex flex-1 bg-primary2 rounded-t-lg">
        <span class="text-xs font-bold text-body p-4">
          완료 {{ cardList.tasksCompleted.length }}
        </span>
      </div>
    </div>

    <div class="w-full flex gap-12 min-h-[calc(100%-48px)]">
      <div class="flex-1 px-4 pb-4 bg-primary2 rounded-b-lg relative">
        <div class="absolute top-0 left-0 px-4 w-full">
          <div
            v-if="cardList.tasksInProgress.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-bold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="cardList.tasksInProgress"
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
            v-if="cardList.tasksPendingComplete.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-bold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="cardList.tasksPendingComplete"
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
            v-if="cardList.tasksCompleted.length === 0"
            class="w-full max-w-80 h-[130px] bg-white border border-dashed border-border-1 rounded-lg flex justify-center items-center">
            <span class="whitespace-pre-wrap text-center text-sm font-bold text-disabled">
              {{ '상태를 변경할 작업을\n끌어 놓으세요' }}
            </span>
          </div>
        </div>
        <draggableComponent
          :list="cardList.tasksCompleted"
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
import { DUMMY_TASK_CARD_LIST } from '@/datas/dummy'
import { ref } from 'vue'
import draggableComponent from 'vuedraggable'
import TaskCard from '../TaskCard.vue'
import type { DraggableEvent } from '@/types/manager'

const cardList = ref(DUMMY_TASK_CARD_LIST)

const status = {
  tasksInProgress: '진행 중',
  tasksPendingComplete: '검토 중',
  tasksCompleted: '완료'
}

const onListChange = (event: DraggableEvent, key: keyof typeof status) => {
  const { added } = event
  if (added) {
    cardList.value[key][added.newIndex].taskStatus = status[key]
  }
}
</script>
