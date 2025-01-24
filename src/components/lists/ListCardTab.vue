<template>
  <div
    class="flex gap-2 items-center"
    :style="{ width: width ? `${width}px` : '' }"
    :class="!width && 'grow'">
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
      class="text-black"
      :class="isTextXs ? 'text-xs' : 'text-sm'">
      {{ content ? content : '-' }}</span
    >
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import type { ListCardInfo, Status } from '@/types/common'
=======
import type { ListCardProps } from '@/types/common'
>>>>>>> 858bdd9630d2c3ba928ee83d07b99f5937146557
import TaskStatus from '../TaskStatus.vue'

const { content, width, isTextXs, profileImg, isStatus } = defineProps<ListCardProps>()
</script>

<style scoped></style>
