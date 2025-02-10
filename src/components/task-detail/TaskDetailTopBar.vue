<template>
  <div class="w-full flex justify-between items-center bg-white px-6">
    <div class="flex gap-2 text-sm font-bold">
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
        @click="onButtonClick(`/request-approve?requestId=${id}`)"
        v-if="isReviewer && !isApproved"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="approveIcon" />
        <p class="text-primary1">요청 승인</p>
      </div>
      <div
        @click="toggleModal('cancel')"
        v-if="!isApproved && (isRequestor || isReviewer)"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="cancelIcon" />
        <p class="text-red-1">요청 취소</p>
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
      @close="finishCancel">
      <template #header>요청이 취소되었습니다</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { cancelTaskUser } from '@/api/user'
import {
  approveIcon,
  cancelIcon,
  closeIcon,
  modificationIcon,
  reRequestIcon
} from '@/constants/iconPath'
import type { TaskDetailTopBarProps } from '@/types/manager'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonIcons from '../common/CommonIcons.vue'

const router = useRouter()
const { isApproved, closeTaskDetail, id, isReviewer, isRequestor } =
  defineProps<TaskDetailTopBarProps>()

import { useQueryClient } from '@tanstack/vue-query'
import ModalView from '../common/ModalView.vue'

const queryClient = useQueryClient()

const isModalOpen = ref({
  cancel: false,
  success: false
})

const toggleModal = (key: keyof typeof isModalOpen.value) => {
  isModalOpen.value[key] = !isModalOpen.value[key]
}

const closeCancelModal = () => {
  isModalOpen.value.cancel = false
}

const cancelTask = async () => {
  await cancelTaskUser(id)
  toggleModal('cancel')
  toggleModal('success')
}

const finishCancel = async () => {
  await queryClient.refetchQueries({
    queryKey: ['myRequest']
  })

  toggleModal('success')
  closeTaskDetail()
}

const onButtonClick = (url: string) => {
  document.body.style.overflow = ''
  router.push(url)
}
</script>
