<template>
  <div :class="['flex w-full', isProcessor ? 'justify-end' : 'justify-start']">
    <div :class="['w-10 h-10 rounded-full pt-1.5', isProcessor ? 'order-3' : 'order-1']">
      <img
        :src="history.details.commentFileDetails?.profileImageUrl || '/images/mockProfile.jpg'"
        class="rounded-full" />
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
        'flex h-full items-end text-xs font-bold text-body',
        isProcessor ? 'ml-4 order-1' : 'ml-2 order-3'
      ]">
      <div
        v-if="history.details.commentDetails?.nickName === info.nickname"
        class="relative cursor-pointer">
        <CommonIcons
          :name="menuDotIcon"
          @click="clickMenuDot" />
        <div
          v-if="isClicked"
          @click="deleteCommentText"
          :class="[
            'absolute shadow-custom bottom-0 w-20 h-7 flex items-center justify-center text-xs text-red-1 bg-white hover:bg-background-1',
            isProcessor ? 'right-6' : 'left-6'
          ]">
          삭제
        </div>
      </div>
      {{ history.details.commentFileDetails?.isModified ? '(수정됨)' : '' }}
      {{ formatTodayOrNot(history.date, history.time) }}
    </div>
  </div>
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

const { history, requestorName, taskId } = defineProps<TaskDetailHistoryChatProps>()

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)
const isClicked = ref(false)
const queryClient = useQueryClient()
const clickMenuDot = async () => {
  isClicked.value = !isClicked.value
}

const deleteCommentText = async () => {
  isClicked.value = !isClicked.value
  await deleteComment(history.historyId)
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
}

const isProcessor = computed(() => history.details.commentFileDetails?.nickName !== requestorName)
</script>
