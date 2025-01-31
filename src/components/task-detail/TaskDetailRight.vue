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
          class="rounded-full overflow-hidden"
          style="width: 20px; height: 20px"
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
          style="width: 20px; height: 20px"
          class="rounded-full"
          alt="processorImg" />
        <p class="text-sm text-black">{{ taskDetail.processorNickName || '-' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DUMMY_PROCESSOR, DUMMY_REQUEST_PROCESSORS } from '@/datas/taskdetail'
import type { TaskDetailRightProps } from '@/types/user'
import { formatDate } from '@/utils/date'
import { defineProps, ref } from 'vue'
import TaskStatus from '../TaskStatus.vue'
import TaskDetailDropdown from './TaskDetailDropdown.vue'

const { taskDetail, isManager } = defineProps<TaskDetailRightProps>()

const processor = ref(DUMMY_PROCESSOR.nickName)
</script>

<script setup lang="ts"></script>
