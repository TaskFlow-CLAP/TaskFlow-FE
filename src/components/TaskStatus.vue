<template>
  <div
    class="flex px-3 py-1 rounded-full"
    :class="bgColor">
    <span
      class="text-xs font-bold"
      :class="textColor"
      >{{ status }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { status, isActive } = defineProps<{
  status?: string
  isActive?: boolean
}>()

const defaultColor = {
  요청: 'gray',
  '진행 중': 'blue',
  '검토 중': 'orange',
  완료: 'green',
  종료: 'red'
}

const key = status as keyof typeof defaultColor

const textColor = computed(() => {
  return isActive ? 'text-white' : `text-${defaultColor[key]}-1`
})
const bgColor = computed(() => {
  return isActive ? `bg-${defaultColor[key]}-1` : `bg-${defaultColor[key]}-2`
})
</script>

<style scoped></style>
