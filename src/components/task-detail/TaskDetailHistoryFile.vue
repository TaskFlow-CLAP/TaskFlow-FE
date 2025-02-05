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
      {{ history.details.commentFileDetails?.isModified ? '(수정됨)' : '' }}
      {{ formatTodayOrNot(history.date, history.time) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { fileIcon } from '@/constants/iconPath'
import type { TaskHistory } from '@/types/user'
import { formatTodayOrNot } from '@/utils/date'
import { computed, defineProps } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
const { history, requestorName } = defineProps<{
  history: TaskHistory
  requestorName: string
}>()

const isProcessor = computed(() => history.details.commentFileDetails?.nickName !== requestorName)
</script>
