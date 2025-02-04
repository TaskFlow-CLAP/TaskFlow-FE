<template>
  <div class="flex flex-wrap items-center gap-2.5">
    <div
      v-for="statusItem in TASK_STATUS_LIST"
      :key="statusItem.content"
      class="flex px-3 py-1 rounded-[45px]"
      :class="[bgColor(statusItem.value), isProcessor ? 'cursor-pointer' : '']"
      @click="isProcessor ? changeStatus(statusItem.value) : null">
      <span
        class="text-[11px] font-bold"
        :class="textColor(statusItem.value)">
        {{ statusItem.content }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { patchChangeStatus } from '@/api/user'
import { TASK_STATUS_LIST } from '@/constants/common'
import type { Status } from '@/types/common'
import type { TaskStatusListProps } from '@/types/user'
import { statusAsColor } from '@/utils/statusAsColor'
import { useQueryClient } from '@tanstack/vue-query'
import { ref, watch } from 'vue'

const { modelValue, isProcessor, taskId } = defineProps<TaskStatusListProps>()

const emit = defineEmits(['update:status'])

const currentStatus = ref(modelValue)
const queryClient = useQueryClient()

watch(
  () => modelValue,
  newValue => {
    currentStatus.value = newValue
  }
)

const textColor = (taskStatus: Status) => {
  return currentStatus.value === taskStatus ? 'text-white' : `text-${statusAsColor(taskStatus)}-1`
}
const bgColor = (taskStatus: Status) => {
  return currentStatus.value === taskStatus
    ? `bg-${statusAsColor(taskStatus)}-1`
    : `bg-${statusAsColor(taskStatus)}-2`
}

const changeStatus = async (newStatus: Status) => {
  if (currentStatus.value === newStatus) {
    return
  }
  currentStatus.value = newStatus
  emit('update:status', newStatus)

  try {
    const res = await patchChangeStatus(taskId || 0, newStatus)
    console.log(res, '상태 바꾸기')
    queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
  } catch (error) {
    console.error('Failed to update status:', error)
  }
}
</script>
