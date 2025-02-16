<template>
  <div class="w-full flex justify-between items-center bg-white px-6">
    <div class="flex gap-2 text-sm font-semibold">
      <div
        v-if="isApproved && isRequestor"
        @click="onButtonClick(`/task-request?requestType=re&id=${id}`)"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="reRequestIcon" />
        <p class="text-body">재요청</p>
      </div>
      <div
        v-if="!isApproved && isRequestor"
        @click="onButtonClick(`/task-request?requestType=edit&id=${id}`)"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="modificationIcon" />
        <p class="text-primary1">요청 수정</p>
      </div>
      <div
        @click="toggleModal('cancel')"
        v-if="!isApproved && isRequestor"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="cancelIcon" />
        <p class="text-red-1">요청 취소</p>
      </div>
      <div
        @click="onButtonClick(`/request-approve?requestId=${id}`)"
        v-if="isReviewer && !isApproved"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="approveIcon" />
        <p class="text-primary1">요청 승인</p>
      </div>
      <div
        @click="toggleModal('reject')"
        v-if="!isApproved && isReviewer"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons
          :name="reRequestIcon"
          :style="{ fill: '#dc2626' }" />
        <p class="text-red-1">요청 반려</p>
      </div>
    </div>
    <button
      type="button"
      @click="closeTaskDetail"
      class="hover:bg-background-2 p-[2px] rounded">
      <CommonIcons :name="closeIcon" />
    </button>
    <ModalView
      :is-open="isModalOpen.cancel"
      type="warningType"
      @close="closeCancelModal()"
      @click="cancelTask">
      <template #header>요청을 취소 하시겠습니까?</template>
      <template #body>요청하신 내용은 사라집니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalOpen.success"
      type="successType"
      @close="closeAllModal">
      <template #header>{{ modalSuccessMessage }}</template>
    </ModalView>
    <ModalView
      :is-open="isModalOpen.reject"
      @update:model-value="value => (rejectReason = value || '')"
      type="inputType"
      @close="closeAllModal"
      @click="rejectRequest">
      <template #header>반려 사유를 입력해주세요</template>
    </ModalView>
    <ModalView
      :is-open="isModalOpen.fail"
      type="failType"
      @close="closeErrorModal">
      <template #header>{{ modalError }}</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { cancelTaskUser, terminateTaskUser } from '@/api/user'
import {
  approveIcon,
  cancelIcon,
  closeIcon,
  modificationIcon,
  reRequestIcon
} from '@/constants/iconPath'
import type { TaskDetailTopBarProps } from '@/types/manager'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonIcons from '../common/CommonIcons.vue'
import ModalView from '../common/ModalView.vue'

const router = useRouter()
const { isApproved, closeTaskDetail, id, isReviewer, isRequestor } =
  defineProps<TaskDetailTopBarProps>()

const queryClient = useQueryClient()
const backModal = ref(false)
const modalSuccessMessage = ref('')
const modalError = ref('')
const rejectReason = ref('')
const isModalOpen = ref({
  cancel: false,
  success: false,
  reject: false,
  fail: false
})

const toggleModal = (key: keyof typeof isModalOpen.value) => {
  isModalOpen.value = Object.fromEntries(
    Object.keys(isModalOpen.value).map(k => [k, k === key])
  ) as typeof isModalOpen.value
}

const closeCancelModal = () => {
  isModalOpen.value.cancel = false
}

const closeErrorModal = () => {
  isModalOpen.value = {
    reject: backModal.value ? true : false,
    fail: false,
    success: false,
    cancel: false
  }
}

const closeAllModal = async () => {
  const prevSuccess = isModalOpen.value.success
  isModalOpen.value = { reject: false, cancel: false, success: false, fail: false }
  await queryClient.refetchQueries({
    queryKey: ['myRequest']
  })
  if (prevSuccess) queryClient.invalidateQueries({ queryKey: ['requested'] })
}

const cancelTask = async () => {
  await cancelTaskUser(id)
  modalSuccessMessage.value = '요청이 취소되었습니다'
  toggleModal('cancel')
  toggleModal('success')
}

const rejectRequest = async () => {
  rejectReason.value = rejectReason.value.trim()
  if (rejectReason.value.length === 0) {
    toggleModal('fail')
    modalError.value = '반려 사유를 입력해주세요'
    backModal.value = true
    return
  }
  backModal.value = false
  await terminateTaskUser(id, rejectReason.value)
  modalSuccessMessage.value = '요청이 반려되었습니다'
  toggleModal('success')
  queryClient.invalidateQueries({ queryKey: ['taskDetailUser', id] })
  queryClient.invalidateQueries({ queryKey: ['historyData', id] })
}

const onButtonClick = (url: string) => {
  router.push(url)
}
</script>
