<template>
  <div
    :class="[
      'flex flex-col border-b py-3 px-4 cursor-pointer hover:bg-background-2 gap-2',
      { 'bg-primary2': !isRead }
    ]">
    <span class="flex w-full justify-between items-center">
      <p class="text-xs text-body font-semibold whitespace-pre-wrap">
        {{ notificationType[type] }}
      </p>
      <span class="text-xs text-body">{{ formatTimeAgo(createdAt) }}</span>
    </span>
    <div
      class="flex flex-col text-xs gap-1"
      v-if="type === 'COMMENT'">
      <span>
        <span class="font-semibold text-primary3">"{{ title }}"</span> 작업에 새로운 댓글이
        추가되었습니다
      </span>
      <span class="font-semibold text-body line-clamp-2">"{{ message }}"</span>
    </div>
    <div
      class="text-xs"
      v-else-if="type === 'TASK_REQUESTED'">
      <span class="font-semibold text-primary3">"{{ title }}"</span> 작업이 요청되었습니다
    </div>
    <div
      class="text-xs"
      v-else-if="type === 'STATUS_SWITCHED'">
      <span class="font-semibold text-primary3">"{{ title }}"</span> 작업이
      <span class="font-semibold text-primary3">{{ message }}</span> 상태로 변경되었습니다
    </div>
    <div
      class="text-xs"
      v-else-if="type === 'PROCESSOR_ASSIGNED'">
      <span class="font-semibold text-primary3">"{{ title }}"</span> 작업이 할당되었습니다
    </div>
    <div
      class="text-xs"
      v-else-if="type === 'PROCESSOR_CHANGED'">
      <span class="font-semibold text-primary3">"{{ title }}"</span> 작업이 재할당되었습니다
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NotificationType } from '@/types/common'
import { formatTimeAgo } from '@/utils/date'

const { type, title, message, isRead, createdAt } = defineProps<{
  type: NotificationType
  title: string
  message?: string
  isRead?: boolean
  createdAt: string
}>()

const notificationType = {
  COMMENT: '새 댓글 추가',
  TASK_REQUESTED: '새 작업 요청',
  STATUS_SWITCHED: '작업 상태 변경',
  PROCESSOR_ASSIGNED: '내 작업 추가',
  PROCESSOR_CHANGED: '담당자 변경'
}
</script>
