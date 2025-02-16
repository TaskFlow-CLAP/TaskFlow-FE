<template>
  <div class="flex flex-wrap items-center gap-2.5">
    <ModalView
      :is-open="isModalVisible.reject"
      @update:model-value="value => (rejectReason = value || '')"
      type="terminate"
      @close="closeAllModal"
      @click="rejectRequest">
      <template #header>종료 사유를 입력해주세요</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.success"
      type="successType"
      @close="closeAllModal">
      <template #header>작업이 종료되었습니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.fail"
      type="failType"
      @close="closeModal">
      <template #header>{{ modalError }}</template>
    </ModalView>
    <div
      v-for="statusItem in TASK_STATUS_LIST.slice(1)"
      :key="statusItem.content"
      class="flex px-3 py-1 rounded-[45px]"
      :class="[bgColor(statusItem.value), isProcessor ? 'cursor-pointer' : '']"
      @click="isProcessor ? changeStatus(statusItem.value) : null">
      <span
        class="text-[11px] font-semibold"
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
import ModalView from '../common/ModalView.vue'
import DOMPurify from 'dompurify'

const { modelValue, isProcessor, taskId } = defineProps<TaskStatusListProps>()
const modalError = ref('')
const rejectReason = ref('')
const currentStatus = ref(modelValue)
const isModalVisible = ref({
  reject: false,
  fail: false,
  success: false
})
const backModal = ref(false)

const emit = defineEmits(['update:status'])
const queryClient = useQueryClient()

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
  isModalVisible.value = { reject: backModal.value ? true : false, fail: false, success: false }
}

const closeAllModal = () => {
  const prevSuccess = isModalVisible.value.success
  isModalVisible.value = { reject: false, fail: false, success: false }
  if (prevSuccess) queryClient.invalidateQueries({ queryKey: ['requested'] })
}

const textColor = (taskStatus: Status) => {
  return currentStatus.value === taskStatus ? 'text-white' : `text-zinc-400`
}

const bgColor = (taskStatus: Status) => {
  return currentStatus.value === taskStatus
    ? `bg-${statusAsColor(taskStatus)}-1`
    : `bg-zinc-100${isProcessor ? ' hover:bg-zinc-200' : ''}`
}

const rejectRequest = async () => {
  if (rejectReason.value.length === 0) {
    toggleModal('fail')
    modalError.value = '종료 사유를 입력해주세요'
    backModal.value = true
    return
  }
  backModal.value = false
  await axiosInstance.patch(`/api/tasks/${taskId}/terminate`, {
    reason: DOMPurify.sanitize(rejectReason.value)
  })
  toggleModal('success')
  emit('update:status', 'TERMINATED')
  currentStatus.value = 'TERMINATED'
  queryClient.invalidateQueries({ queryKey: ['taskDetailUser', taskId] })
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
}

const changeStatus = async (newStatus: Status) => {
  if (currentStatus.value === newStatus) {
    return
  }
  if (newStatus === 'TERMINATED') {
    toggleModal('reject')
    return
  } else {
    emit('update:status', newStatus)
    currentStatus.value = newStatus
    await patchChangeStatus(taskId || 0, newStatus)
    queryClient.invalidateQueries({ queryKey: ['taskDetailUser', taskId] })
    queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
  }
}
</script>
