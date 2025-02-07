<template>
  <div
    class="flex gap-2 items-center"
    :style="{ width: width ? `${width}px` : '' }"
    :class="width ? 'shrink-0' : 'grow'">
    <div
      v-if="profileImg"
      class="w-6 h-6 rounded-full overflow-hidden">
      <img :src="profileImg" />
    </div>
    <TaskStatus
      v-if="isStatus"
      :status="content as Status" />
    <span
      v-else
      class="break-all"
      :class="`${isTextXs ? 'text-xs font-bold' : 'text-sm'} ${isStatusCode ? (content === '200' ? 'text-green-1' : 'text-red-1') : ''} ${isTextBody ? 'text-body' : 'text-black'}`">
      {{ content ? content : '-' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ListCardProps, Status } from '@/types/common'
import TaskStatus from '../common/TaskStatus.vue'

const { content, width, isTextXs, profileImg, isStatus, isStatusCode, isTextBody } =
  defineProps<ListCardProps>()
</script>

<style scoped></style>
