<template>
  <div
    class="flex gap-2 items-center"
    :style="{ width: width ? `${width}px` : '' }"
    :class="width ? 'shrink-0' : 'grow'">
    <ImageContainer
      v-if="profileImg !== undefined && content"
      :size="24"
      :url="profileImg" />
    <TaskStatus
      v-if="isStatus"
      :status="content as Status" />
    <span
      v-else
      class="break-all line-clamp-2"
      :class="`${isTextXs ? 'text-xs' : 'text-sm'} ${isStatusCode ? (content === '200' ? 'text-green-1' : 'text-red-1') : ''} ${isTextBody ? 'text-body' : ''}`">
      {{ content ? content : '-' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ListCardProps, Status } from '@/types/common'
import ImageContainer from '../common/ImageContainer.vue'
import TaskStatus from '../common/TaskStatus.vue'

const { content, width, isTextXs, profileImg, isStatus, isStatusCode, isTextBody } =
  defineProps<ListCardProps>()
</script>
