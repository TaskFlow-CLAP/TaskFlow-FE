<template>
  <div class="flex flex-wrap items-center gap-2.5">
    <ModalView
      :is-open="isModalVisible.reject"
      @update:model-value="value => (rejectReason = value)"
      type="inputType"
      @close="closeModal"
      @click="rejectRequest">
      <template #header>종료 사유를 입력해주세요</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.success"
      type="successType"
      @close="closeModal">
      <template #header>작업이 종료되었습니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.fail"
      type="failType"
      @close="closeModal">
      <template #header>{{ modalError }}</template>
    </ModalView>
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
import { axiosInstance } from '@/utils/axios'
import { statusAsColor } from '@/utils/statusAsColor'
import { useQueryClient } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import ModalView from '../ModalView.vue'

const { modelValue, isProcessor, taskId } = defineProps<TaskStatusListProps>()
const modalError = ref('')
const rejectReason = ref('')
const emit = defineEmits(['update:status'])

const currentStatus = ref(modelValue)
const queryClient = useQueryClient()
const isModalVisible = ref({
  reject: false,
  fail: false,
  success: false
})

watch(
  () => modelValue,
  newValue => {
    currentStatus.value = newValue
  }
)

const toggleModal = (key: keyof typeof isModalVisible.value) => {
  isModalVisible.value = Object.fromEntries(
    Object.keys(isModalVisible.value).map(k => [k, k === key])
  ) as typeof isModalVisible.value
}

const closeModal = () => {
  const prevSuccess = isModalVisible.value.success
  isModalVisible.value = { reject: false, fail: false, success: false }
  if (prevSuccess) queryClient.invalidateQueries({ queryKey: ['requested'] })
}

const textColor = (taskStatus: Status) => {
  return currentStatus.value === taskStatus ? 'text-white' : `text-${statusAsColor(taskStatus)}-1`
}

const bgColor = (taskStatus: Status) => {
  return currentStatus.value === taskStatus
    ? `bg-${statusAsColor(taskStatus)}-1`
    : `bg-${statusAsColor(taskStatus)}-2`
}

const rejectRequest = async () => {
  if (rejectReason.value.length === 0) {
    toggleModal('fail')
    modalError.value = '종료 사유를 입력해주세요'
    return
  }
  try {
    await axiosInstance.patch(`/api/tasks/${taskId}/terminate`, rejectReason)
    toggleModal('success')
  } catch {
    toggleModal('fail')
    modalError.value = '작업 종료에 실패했습니다'
  }
}

const changeStatus = async (newStatus: Status) => {
  if (currentStatus.value === newStatus) {
    return
  }
  currentStatus.value = newStatus
  emit('update:status', newStatus)
  if (newStatus === 'TERMINATED') {
    toggleModal('reject')
    return
  }
  try {
    await patchChangeStatus(taskId || 0, newStatus)
    queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
  } catch (error) {
    console.error('Failed to update status:', error)
  }
}
</script>
