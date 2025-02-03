<template>
  <div class="flex flex-wrap items-center gap-2.5">
    <div
      v-for="status in TASK_STATUS_LIST"
      :key="status.content"
      class="flex px-3 py-1 rounded-[45px]"
      :class="bgColor(status.value)">
      <span
        class="text-[11px] font-bold"
        :class="textColor(status.value)">
        {{ status.content }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TASK_STATUS_LIST } from '@/constants/common'
import type { Status } from '@/types/common'
import { statusAsColor } from '@/utils/statusAsColor'

const { status } = defineProps<{
  status: Status
}>()

const textColor = (taskStatus: Status) => {
  return status === taskStatus ? 'text-white' : `text-${statusAsColor(taskStatus)}-1`
}
const bgColor = (taskStatus: Status) => {
  return status === taskStatus
    ? `bg-${statusAsColor(taskStatus)}-1`
    : `bg-${statusAsColor(taskStatus)}-2`
}
</script>
