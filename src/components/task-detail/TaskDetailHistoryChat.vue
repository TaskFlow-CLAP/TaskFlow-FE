<template>
  <div :class="['flex w-full', isProcessor ? 'justify-end' : 'justify-start']">
    <div :class="['w-10 h-10 rounded-full pt-1.5', isProcessor ? 'order-3' : 'order-1']">
      <img
        :src="history.details.commentDetails?.profileImageUrl || '/images/mockProfile.jpg'"
        class="rounded-full" />
    </div>
    <div :class="['flex flex-col gap-2 px-4 order-2', isProcessor ? 'items-end' : 'items-start']">
      <p>{{ history.details.commentDetails?.nickName }}</p>
      <p
        :class="[
          'flex max-w-[400px] flex-wrap px-6 py-4  text-black rounded-lg',
          isProcessor ? 'bg-primary2' : 'bg-background-2'
        ]">
        {{ history.details.commentDetails?.comment }}
      </p>
    </div>
    <div
      :class="[
        'flex flex-col h-full justify-end text-xs font-bold text-body gap-1',
        isProcessor ? 'order-1 items-end' : 'order-3 items-start'
      ]">
      <CommonIcons :name="menuDotIcon" />
      <div>
        {{ history.details.commentDetails?.isModified ? '(수정됨)' : '' }}
        {{ formatTodayOrNot(history.date, history.time) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuDotIcon } from '@/constants/iconPath'
import type { TaskHistory } from '@/types/user'
import { formatTodayOrNot } from '@/utils/date'
import { computed, defineProps } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
const { history, requestorName } = defineProps<{
  history: TaskHistory
  requestorName: string
}>()

const isProcessor = computed(() => history.details.commentDetails?.nickName !== requestorName)
</script>
