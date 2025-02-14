<template>
  <div :class="['flex w-full', isRequestor ? 'justify-start' : 'justify-end']">
    <div
      :class="[
        'flex justify-center items-center w-10 h-10 shrink-0 rounded-full overflow-hidden mt-1.5',
        isRequestor ? 'order-1' : 'order-3'
      ]">
      <ImageContainer
        :url="history.details.commentDetails?.profileImageUrl"
        :size="40" />
    </div>
    <div
      :class="[
        'flex flex-col gap-2 order-2 font-semibold',
        isRequestor ? 'items-start pl-4 pr-2' : 'items-end pr-4 pl-2'
      ]">
      <p class="text-xs text-body">{{ history.details.commentDetails?.nickName }}</p>
      <div :class="['flex gap-2', isRequestor ? 'flex-row' : 'flex-row-reverse']">
        <p
          :class="[
            'flex max-w-[400px] flex-wrap break-all px-4 py-3 text-base rounded-lg font-normal',
            isRequestor ? 'bg-background-2' : 'bg-primary2'
          ]">
          {{ history.details.commentDetails?.comment || history.details.taskDetails?.value }}
        </p>
        <div
          :class="[
            'flex flex-col justify-end self-end text-xs font-semibold text-body gap-1 relative',
            isRequestor ? 'order-3 items-start' : 'order-1 items-end'
          ]">
          <div
            ref="btnRef"
            v-if="history.details.commentDetails?.nickName === info.nickname"
            class="relative cursor-pointer h-full">
            <CommonIcons
              :name="menuDotIcon"
              @click="clickMenuDot" />
            <div
              v-if="isClicked"
              @click="handleModal"
              :class="[
                'absolute shadow-custom bottom-0 w-20 h-7 flex items-center justify-center text-xs text-red-1 bg-white hover:bg-background-1 rounded',
                isRequestor ? 'left-6' : 'right-6'
              ]">
              삭제
            </div>
          </div>
          <div class="flex flex-col gap-1 h-full justify-end font-semibold whitespace-nowrap">
            {{ formatTimeShort(history.time) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalView
    :isOpen="isModalOpen"
    :type="'warningType'"
    @click="deleteCommentText"
    @close="closeModal">
    <template #header> 댓글을 삭제하시겠습니까? </template>
  </ModalView>
</template>

<script setup lang="ts">
import { deleteComment } from '@/api/user'
import { menuDotIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useMemberStore } from '@/stores/member'
import type { TaskDetailHistoryChatProps } from '@/types/common'
import { formatTimeShort } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, defineProps, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ImageContainer from '../common/ImageContainer.vue'
import ModalView from '../common/ModalView.vue'

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)
const isClicked = ref(false)
const isModalOpen = ref(false)
const isRequestor = computed(
  () =>
    history.details.commentDetails?.nickName === requestorName ||
    history.details.commentFileDetails?.nickName === requestorName
)
const queryClient = useQueryClient()
const { taskId, history, requestorName } = defineProps<TaskDetailHistoryChatProps>()

const clickMenuDot = async () => {
  isClicked.value = !isClicked.value
}
const handleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
const closeModal = () => {
  isClicked.value = !isClicked.value
  isModalOpen.value = false
}
const closeMenuDot = () => {
  isClicked.value = false
}

const deleteCommentText = async () => {
  isClicked.value = !isClicked.value
  handleModal()
  if (history.details.commentDetails?.commentId !== undefined) {
    await deleteComment(history.details.commentDetails.commentId)
  }
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
}

const { htmlRef: btnRef } = useOutsideClick(() => closeMenuDot())
</script>
