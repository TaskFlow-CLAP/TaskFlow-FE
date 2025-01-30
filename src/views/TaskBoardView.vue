<template>
  <div class="max-w-1200 h-screen flex flex-col gap-6">
    <TitleBar title="작업 보드" />

    <div class="grow flex gap-12 overflow-hidden">
      <div class="w-full flex flex-col bg-primary2 rounded-lg relative">
        <span class="text-xs font-bold text-body p-4">
          진행 중 {{ cardList.tasksInProgress.length }}
        </span>
        <div class="absolute top-12 px-4 w-full">
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
          class="flex flex-col grow px-4 pb-4 gap-4 overflow-y-scroll"
          @change="onListChange">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element"
              draggable />
          </template>
        </draggableComponent>
      </div>

      <div class="w-full flex flex-col bg-primary2 rounded-lg relative">
        <span class="text-xs font-bold text-body p-4">
          검토 중 {{ cardList.tasksPendingComplete.length }}
        </span>
        <div class="absolute top-12 px-4 w-full">
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
          class="flex flex-col grow px-4 pb-4 gap-4 overflow-y-scroll"
          @change="onListChange">
          <template #item="{ element }">
            <TaskCard
              :key="element.taskId"
              :data="element" />
          </template>
        </draggableComponent>
      </div>

      <div class="w-full flex flex-col bg-primary2 rounded-lg relative">
        <span class="text-xs font-bold text-body p-4">
          완료 {{ cardList.tasksCompleted.length }}
        </span>
        <div class="absolute top-12 px-4 w-full">
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
          class="flex flex-col grow px-4 pb-4 gap-4 overflow-y-scroll"
          @change="onListChange">
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
import TitleBar from '@/components/TitleBar.vue'
import { DUMMY_TASK_CARD_LIST } from '@/datas/dummy'
import { ref } from 'vue'
import draggableComponent from 'vuedraggable'
import type { SortableEvent } from 'sortablejs'
import TaskCard from '@/components/TaskCard.vue'

const cardList = ref(DUMMY_TASK_CARD_LIST)

const onListChange = (event: SortableEvent) => {
  console.log(event)
}
</script>
