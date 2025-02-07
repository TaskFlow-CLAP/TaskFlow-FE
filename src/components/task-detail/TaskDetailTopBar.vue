<template>
  <div class="w-full flex justify-between items-center bg-white">
    <div class="flex gap-4 text-sm font-bold pb-6">
      <div
        v-if="isApproved && isRequestor"
        @click="router.push(`/task-request?requestType=re&id=${id}`)"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="reRequestIcon" />
        <p class="text-body">재요청</p>
      </div>
      <div
        v-if="!isApproved && isRequestor"
        @click="router.push(`/task-request?requestType=edit&id=${id}`)"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="modificationIcon" />
        <p class="text-primary1">요청 수정</p>
      </div>
      <div
        @click="ApproveTask"
        v-if="isProcessor && !isApproved"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="approveIcon" />
        <p class="text-primary1">요청 승인</p>
      </div>
      <div
        @click="toggleModal('cancel')"
        v-if="!isApproved && (isRequestor || isProcessor)"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="cancelIcon" />
        <p class="text-red-1">요청 취소</p>
      </div>
    </div>
    <CommonIcons
      :name="closeIcon"
      @click="closeTaskDetail"
      class="cursor-pointer" />
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
      @close="toggleModal('success')">
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
import ModalView from '../ModalView.vue'

const router = useRouter()
const { isApproved, closeTaskDetail, id, isProcessor, isRequestor } =
  defineProps<TaskDetailTopBarProps>()

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

const ApproveTask = () => {
  router.push(`/request-approve/${id}`)
}
</script>
