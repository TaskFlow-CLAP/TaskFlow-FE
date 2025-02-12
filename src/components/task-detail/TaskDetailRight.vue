<template>
  <div class="sticky top-0 w-[280px] shrink-0 flex flex-col gap-y-6 overflow-y-auto p-6">
    <div>
      <p class="task-detail">작업코드</p>
      <p class="text-sm">{{ data.taskCode || '-' }}</p>
    </div>
    <div>
      <p class="task-detail">요청일</p>
      <p class="text-sm">{{ formatDateAndTime(data.requestedAt) }}</p>
    </div>
    <div>
      <p class="task-detail">종료일</p>
      <p class="text-sm">
        {{ (data.finishedAt && formatDateAndTime(data.finishedAt)) || '-' }}
      </p>
    </div>
    <div>
      <p class="task-detail">상태</p>
      <div
        v-if="data.taskStatus === 'REQUESTED'"
        class="w-fit">
        <TaskStatus :status="data.taskStatus" />
      </div>
      <div v-else>
        <TaskStatusList
          v-model="taskStatus"
          :isProcessor="info.isReviewer || isProcessor"
          :taskId="data.taskId" />
      </div>
    </div>
    <div>
      <p class="task-detail">요청자</p>
      <div class="flex gap-2">
        <ImageContainer
          :url="data.requesterImageUrl"
          :size="20" />
        <p class="text-sm">{{ data.requesterNickName }}</p>
      </div>
    </div>
    <div>
      <p class="task-detail">담당자</p>
      <div v-if="data.taskStatus !== 'REQUESTED' && isProcessor">
        <TaskDetailManagerDropdown
          v-model="newManager"
          :task-id="data.taskId" />
      </div>
      <div
        v-else
        class="flex gap-2">
        <ImageContainer
          v-if="data.processorNickName"
          :url="data.processorImageUrl"
          :size="20" />
        <p class="text-sm">{{ data.processorNickName || '-' }}</p>
      </div>
    </div>
    <div v-if="data.taskStatus !== 'REQUESTED' && info.isReviewer">
      <p class="task-detail">마감기한</p>
      <div v-if="data.dueDate">
        <div class="w-full flex justify-between items-center">
          <p class="text-sm">{{ formatDueDate(data.dueDate) || '-' }}</p>
        </div>
        <p class="text-red-1 text-xs font-bold">{{ formatDaysBefore(data.dueDate) }}</p>
      </div>
      <div v-else>-</div>
    </div>
    <div v-if="data.taskStatus !== 'REQUESTED' && info.isReviewer">
      <p class="task-detail">구분</p>
      <TaskDetailLabelDropdown
        v-model="taskLabel"
        :placeholder-text="'구분을 선택해주세요'"
        :task-id="data.taskId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { changeProcessor } from '@/api/user'
import { useMemberStore } from '@/stores/member'
import type { ManagerTypes } from '@/types/manager'
import type { TaskDetailDatas } from '@/types/user'
import { formatDateAndTime, formatDaysBefore, formatDueDate } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { defineProps, ref, watch } from 'vue'
import ImageContainer from '../common/ImageContainer.vue'
import TaskStatus from '../common/TaskStatus.vue'
import TaskDetailLabelDropdown from './TaskDetailLabelDropdown.vue'
import TaskDetailManagerDropdown from './TaskDetailManagerDropdown.vue'
import TaskStatusList from './TaskStatusList.vue'

const { data, isProcessor } = defineProps<{ data: TaskDetailDatas; isProcessor: boolean }>()

const taskStatus = ref(data.taskStatus)
const queryClient = useQueryClient()
const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const taskLabel = ref({
  labelId: -1,
  labelName: data.labelName || '',
  labelColor: ''
})

const selectedManager = ref({
  memberId: -1,
  nickname: data.processorNickName,
  imageUrl: data.processorImageUrl,
  remainingTasks: -1
} as ManagerTypes)

const newManager = ref(selectedManager.value)

watch(newManager, async newValue => {
  if (newValue?.nickname !== selectedManager.value.nickname && newValue) {
    await changeProcessor(data.taskId, newValue.memberId)
    selectedManager.value = newValue
    queryClient.invalidateQueries({ queryKey: ['historyData', data.taskId] })
    queryClient.invalidateQueries({ queryKey: ['taskDetailUser', data.taskId] })
  }
})
</script>
