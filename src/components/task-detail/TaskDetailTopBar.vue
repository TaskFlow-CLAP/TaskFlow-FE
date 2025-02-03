<template>
  <div class="w-full flex justify-between items-center bg-white">
    <div class="flex gap-4 text-sm font-bold pb-6">
      <div
        v-if="!isManager && isApproved"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="reRequestIcon" />
        <p class="text-body">재요청</p>
      </div>
      <div
        v-if="!isManager && !isApproved"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="modificationIcon" />
        <p class="text-primary1">요청 수정</p>
      </div>
      <div
        @click="ApproveTask"
        v-if="isManager && !isApproved"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="modificationIcon" />
        <p class="text-primary1">요청 승인</p>
      </div>
      <div
        @click="cancelTask"
        v-if="!isApproved"
        class="flex gap-1 items-center cursor-pointer">
        <CommonIcons :name="cancelIcon" />
        <p class="text-red-1">요청취소</p>
      </div>
    </div>
    <CommonIcons
      :name="closeIcon"
      @click="closeTaskDetail"
      class="cursor-pointer" />
    <ModalView
      type="successType"
      :is-open="isModalOpen.approve"
      @click="ApproveTask"
      @close="ApproveTask">
      <template #header>작업이 승인되었습니다.</template>
    </ModalView>
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
import { cancelIcon, closeIcon, modificationIcon, reRequestIcon } from '@/constants/iconPath'
import { useMemberStore } from '@/stores/member'
import type { TaskDetailTopBarProps } from '@/types/manager'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ModalView from '../ModalView.vue'

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)
const isManager = computed(() => info.value.memberRole === 'ROLE_MANAGER')

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
}

const { isApproved, closeTaskDetail } = defineProps<TaskDetailTopBarProps>()
</script>

<style scoped></style>
