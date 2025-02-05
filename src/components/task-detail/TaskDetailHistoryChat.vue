<template>
  <div class="flex w-full justify-start">
    <div class="w-10 h-10 rounded-full pt-1.5">
      <img
        :src="history.details.commentDetails?.profileImageUrl || '/images/mockProfile.jpg'"
        class="rounded-full" />
    </div>
    <div class="flex flex-col ml-4 gap-2">
      <p>{{ history.details.commentDetails?.nickName }}</p>
      <p class="flex max-w-[400px] flex-wrap px-6 py-4 bg-background-2 text-black rounded-lg">
        {{ history.details.commentDetails?.comment }}
      </p>
    </div>
    <div class="flex h-full items-end text-xs font-bold text-body ml-2">
      {{ formatTodayOrNot(history.date, history.time) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskHistory } from '@/types/user'
import { formatTodayOrNot } from '@/utils/date'
import { defineProps } from 'vue'

const { history } = defineProps<{
  history: TaskHistory
}>()
</script>
