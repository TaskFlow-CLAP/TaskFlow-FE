<template>
  <div :class="['flex w-full', isRequestor ? 'justify-start' : 'justify-end']">
    <div :class="['w-10 h-10 rounded-full pt-1.5', isRequestor ? 'order-1' : 'order-3']">
      <ImageContainer
        :size="40"
        :url="history.details.commentFileDetails?.profileImageUrl" />
    </div>
    <div
      :class="[
        'flex flex-col gap-2 pl-4 pr-2 order-2',
        isRequestor ? 'items-start pr-4 pl-2' : 'items-end pl-2 pr-4'
      ]">
      <p class="text-xs text-body">{{ history.details.commentFileDetails?.nickName }}</p>
      <div :class="['flex gap-2', isRequestor ? 'flex-row' : 'flex-row-reverse']">
        <div
          class="flex max-w-[400px] px-4 py-3 gap-3 items-center rounded-lg"
          :class="isRequestor ? 'bg-background-2' : 'bg-primary2'">
          <a
            class="w-10 h-10 flex items-center justify-center bg-white border border-border-2 rounded-lg shrink-0 hover:bg-primary2"
            :href="history.details.commentFileDetails?.url"
            download>
            <CommonIcons :name="fileIcon" />
          </a>
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <p class="font-normal w-full overflow-hidden whitespace-nowrap text-ellipsis text-sm">
              {{ history.details.commentFileDetails?.fileName }}
            </p>
            <p class="text-xs font-semibold text-body">
              용량 : {{ history.details.commentFileDetails?.size }}
            </p>
          </div>
        </div>
        <div
          :class="[
            'flex flex-col justify-end self-end gap-1 text-xs font-semibold text-body',
            isRequestor ? 'order-3' : ' items-end order-1'
          ]">
          <div
            v-if="history.details.commentFileDetails?.nickName === info.nickname"
            class="relative cursor-pointer">
            <CommonIcons
              :name="menuDotIcon"
              @click="clickMenuDot" />
            <div
              v-if="isClicked"
              @click="handleModal"
              :class="[
                'absolute shadow-custom bottom-0 w-20 h-[27px] rounded flex items-center justify-center text-xs text-red-1 bg-white hover:bg-background-1',
                isRequestor ? 'left-6' : 'right-6'
              ]">
              삭제
            </div>
          </div>
          <div>
            {{ formatTimeShort(history.time) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalView
    :isOpen="isModalOpen"
    :type="'warningType'"
    @click="deleteCommentFile"
    @close="closeModal">
    <template #header> 파일을 삭제하시겠습니까? </template>
  </ModalView>
</template>

<script setup lang="ts">
import { deleteComment } from '@/api/user'
import { fileIcon, menuDotIcon } from '@/constants/iconPath'
import { useMemberStore } from '@/stores/member'
import type { TaskDetailHistoryChatProps } from '@/types/common'
import { formatTimeShort } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, defineProps, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ImageContainer from '../common/ImageContainer.vue'
import ModalView from '../common/ModalView.vue'

const { history, requestorName, taskId } = defineProps<TaskDetailHistoryChatProps>()

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)
const isClicked = ref(false)
const isModalOpen = ref(false)
const queryClient = useQueryClient()
const isRequestor = computed(
  () =>
    history.details.commentDetails?.nickName === requestorName ||
    history.details.commentFileDetails?.nickName === requestorName
)

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
const deleteCommentFile = async () => {
  isClicked.value = !isClicked.value
  if (history.details.commentFileDetails?.commentId !== undefined) {
    await deleteComment(history.details.commentFileDetails?.commentId)
  }
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
}
</script>
