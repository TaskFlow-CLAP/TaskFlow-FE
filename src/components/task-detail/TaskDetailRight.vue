<template>
  <div class="w-60 flex flex-col gap-y-6 pb-6 text-black">
    <div>
      <p class="task-detail">ID</p>
      <p class="text-sm text-black">{{ taskDetail.taskId || '-' }}</p>
    </div>
    <div>
      <p class="task-detail">요청일</p>
      <p class="text-sm text-black">{{ formatDate(taskDetail.requestedAt) }}</p>
    </div>
    <div>
      <p class="task-detail">종료일</p>
      <p class="text-sm text-black">{{ formatDate(taskDetail.finishedAt) || '-' }}</p>
    </div>
    <div>
      <p class="task-detail">상태</p>
      <div class="w-fit">
        <TaskStatus :status="taskDetail.taskStatus" />
      </div>
    </div>
    <div>
      <p class="task-detail">요청자</p>
      <div class="flex gap-2">
        <img
          :src="taskDetail.requesterImageUrl"
          class="rounded-full overflow-hidden w-5 h-5"
          alt="requesterImg" />
        <p class="text-sm text-black">{{ taskDetail.requesterNickName }}</p>
      </div>
    </div>
    <div>
      <p class="task-detail">처리자</p>
      <div v-if="isManager">
        <TaskDetailDropdown
          v-model="processor"
          :options="DUMMY_REQUEST_PROCESSORS"
          :processor="DUMMY_PROCESSOR" />
      </div>
      <div
        v-else
        class="flex gap-2">
        <img
          v-if="taskDetail.processorImageUrl"
          :src="taskDetail.processorImageUrl"
          class="rounded-full overflow-hidden w-5 h-5"
          alt="processorImg" />
        <p class="text-sm text-black">{{ taskDetail.processorNickName || '-' }}</p>
      </div>
    </div>
    <div v-if="isManager">
      <p class="task-detail">마감기한</p>
      <div class="w-full flex justify-between items-center">
        <p class="text-sm text-black">{{ taskDetail.dueDate || '-' }}까지</p>
        <p class="text-primary1 text-xs font-bold">변경</p>
      </div>
      <p class="text-red-1 text-xs font-bold">3일 전</p>
    </div>
    <div v-if="isManager">
      <p class="task-detail">구분</p>
      <TaskDetailLabelDropdown
        v-model="labeling"
        :options="DUMMY_TASK_LABELS"
        :processor="taskDetail.labelName" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DUMMY_PROCESSOR, DUMMY_REQUEST_PROCESSORS, DUMMY_TASK_LABELS } from '@/datas/taskdetail'
import type { TaskDetailRightProps } from '@/types/user'
import { formatDate } from '@/utils/date'
import { defineProps, ref } from 'vue'
import TaskStatus from '../TaskStatus.vue'
import TaskDetailDropdown from './TaskDetailDropdown.vue'
import TaskDetailLabelDropdown from './TaskDetailLabelDropdown.vue'

const { taskDetail, isManager } = defineProps<TaskDetailRightProps>()

const processor = ref(DUMMY_PROCESSOR.nickName)
const labeling = ref(DUMMY_TASK_LABELS[0].labelName)
</script>

<script setup lang="ts"></script>
