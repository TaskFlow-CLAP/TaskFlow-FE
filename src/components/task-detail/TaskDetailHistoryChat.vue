<template>
  <div :class="['flex w-full', isProcessor ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'flex justify-center items-center w-10 h-10 shrink-0 rounded-full overflow-hidden mt-1.5',
        isProcessor ? 'order-3' : 'order-1'
      ]">
      <img
        :src="history.details.commentDetails?.profileImageUrl || '/images/mockProfile.jpg'"
        class="center" />
    </div>
    <div
      :class="[
        'flex flex-col gap-2 order-2',
        isProcessor ? 'items-end pr-4 pl-1' : 'items-start pl-4 pr-1'
      ]">
      <p>{{ history.details.commentDetails?.nickName }}</p>
      <p
        :class="[
          'flex max-w-[400px] flex-wrap px-4 py-3  text-black rounded-lg',
          isProcessor ? 'bg-primary2' : 'bg-background-2'
        ]">
        {{ history.details.commentDetails?.comment }}
      </p>
    </div>
    <div
      :class="[
        'flex flex-col h-full justify-end text-xs font-bold text-body gap-1 relative',
        isProcessor ? 'order-1 items-end' : 'order-3 items-start'
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
      <div class="flex flex-col gap-1">
        {{ history.details.commentDetails?.isModified ? '(수정됨)' : '' }}
        {{ formatTodayOrNot(history.date, history.time) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteComment } from '@/api/user'
import { menuDotIcon } from '@/constants/iconPath'
import { useMemberStore } from '@/stores/member'
import type { TaskDetailHistoryChatProps } from '@/types/common'
import { formatTodayOrNot } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, defineProps, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)
const isClicked = ref(false)
const isProcessor = computed(() => history.details.commentDetails?.nickName !== requestorName)
const queryClient = useQueryClient()

const { taskId, history, requestorName } = defineProps<TaskDetailHistoryChatProps>()

const clickMenuDot = async () => {
  isClicked.value = !isClicked.value
}

const deleteCommentText = async () => {
  isClicked.value = !isClicked.value
  await deleteComment(history.historyId)
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
}
</script>
