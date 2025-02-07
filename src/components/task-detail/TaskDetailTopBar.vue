<template>
  <div class="w-full flex justify-between items-center bg-white px-6">
    <div class="flex gap-2 text-sm font-bold">
      <div
        v-if="isApproved && isRequestor"
        @click="router.push(`/task-request?requestType=re&id=${id}`)"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="reRequestIcon" />
        <p class="text-body">재요청</p>
      </div>
      <div
        v-if="!isApproved && isRequestor"
        @click="router.push(`/task-request?requestType=edit&id=${id}`)"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="modificationIcon" />
        <p class="text-primary1">요청 수정</p>
      </div>
      <div
        @click="ApproveTask"
        v-if="isProcessor && !isApproved"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="approveIcon" />
        <p class="text-primary1">요청 승인</p>
      </div>
      <div
        @click="cancelTask"
        v-if="!isApproved && (isRequestor || isProcessor)"
        class="flex gap-1 items-center cursor-pointer p-1 hover:bg-background-2 rounded">
        <CommonIcons :name="cancelIcon" />
        <p class="text-red-1">요청 취소</p>
      </div>
    </div>
    <button
      @click="closeTaskDetail"
      class="hover:bg-background-2 p-[2px] rounded">
      <CommonIcons :name="closeIcon" />
    </button>
    <ModalView
      type="inputType"
      :is-open="isModalOpen.cancel"
      @click="cancelTask"
      @close="cancelTask">
      <template #header>거부 사유를 입력해주세요</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
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
  approve: false
})

const toggleModal = (key: keyof typeof isModalOpen.value) => {
  isModalOpen.value[key] = !isModalOpen.value[key]
}

const cancelTask = () => {
  toggleModal('cancel')
}

const ApproveTask = () => {
  toggleModal('approve')
  router.push(`/request-approve/${id}`)
}
</script>
