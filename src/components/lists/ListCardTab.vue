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
      :status="content" />
    <span
      v-else
      class="text-black"
      :class="isTextXs ? 'text-xs' : 'text-sm'">
      {{ content ? content : '-' }}</span
    >
  </div>
</template>

<script setup lang="ts">
import type { ListCardProps } from '@/types/common'
import TaskStatus from '../TaskStatus.vue'

const { content, width, isTextXs, profileImg, isStatus } = defineProps<ListCardProps>()
</script>

<style scoped></style>
