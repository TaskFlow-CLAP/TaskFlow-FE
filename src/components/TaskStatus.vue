<template>
  <div
    class="flex px-3 py-1 rounded-full"
    :class="bgColor">
    <span
      class="text-xs font-bold"
      :class="textColor">
      {{ status }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Status } from '@/types/common'
import { statusAsColor } from '@/utils/statusAsColor'
import { computed } from 'vue'

const { status, isActive } = defineProps<{
  status: Status
  isActive?: boolean
}>()

const textColor = computed(() => {
  return isActive ? 'text-white' : `text-${statusAsColor(status)}-1`
})
const bgColor = computed(() => {
  return isActive ? `bg-${statusAsColor(status)}-1` : `bg-${statusAsColor(status)}-2`
})
</script>

<style scoped></style>
