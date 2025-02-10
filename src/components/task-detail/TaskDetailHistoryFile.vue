<template>
  <div :class="['flex w-full', isProcessor ? 'justify-end' : 'justify-start']">
    <div :class="['w-10 h-10 rounded-full pt-1.5', isProcessor ? 'order-3' : 'order-1']">
      <ImageContainer
        :url="history.details.commentDetails?.profileImageUrl"
        :size="40" />
    </div>
    <div :class="['flex flex-col gap-2 px-4 order-2', isProcessor ? 'items-end' : 'items-start']">
      <p>{{ history.details.commentFileDetails?.nickName }}</p>
      <div
        :class="[
          'flex max-w-[400px] flex-wrap px-6 py-4 gap-4 items-center text-black rounded-lg',
          isProcessor ? 'bg-primary2' : 'bg-background-2'
        ]">
        <a
          class="w-10 h-10 flex items-center justify-center bg-white border border-border-2 rounded-lg"
          :href="history.details.commentFileDetails?.url"
          download>
          <CommonIcons :name="fileIcon" />
        </a>
        <div class="flex flex-col gap-2">
          <p>{{ history.details.commentFileDetails?.fileName }}</p>
          <p class="text-xs font-bold text-body">
            용량 : {{ history.details.commentFileDetails?.size }}
          </p>
        </div>
      </div>
    </div>
    <div
      :class="[
        'flex flex-col justify-end h-full gap-1 text-xs font-bold text-body',
        isProcessor ? 'ml-4 order-1' : 'ml-2 order-3'
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
            'absolute shadow-custom bottom-0 w-20 h-7 flex items-center justify-center text-xs text-red-1 bg-white hover:bg-background-1',
            isProcessor ? 'right-6' : 'left-6'
          ]">
          삭제
        </div>
      </div>
      <div>
        {{ history.details.commentFileDetails?.isModified ? '(수정됨)' : '' }}
        {{ formatTodayOrNot(history.date, history.time) }}
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
import { formatTodayOrNot } from '@/utils/date'
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

const isProcessor = computed(() => info.value.nickname !== requestorName)
</script>
