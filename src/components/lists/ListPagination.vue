<template>
  <div
    v-if="totalPage"
    class="w-fit h-6 flex items-center gap-2 relative">
    <div class="flex gap-1 absolute left-0 top-1/2 -translate-x-[calc(100%+8px)] -translate-y-1/2">
      <button
        v-if="pageSet[0] !== 1"
        type="button"
        @click="onPrevSetClick"
        class="rounded hover:bg-primary2">
        <CommonIcons :name="prevSetIcon" />
      </button>
      <button
        v-if="pageNumber !== 1"
        @click="onPrevClick"
        class="rounded hover:bg-primary2">
        <CommonIcons :name="prevIcon" />
      </button>
    </div>
    <button
      v-for="page in pageSet"
      type="button"
      :key="page"
      class="w-6 h-6 flex justify-center items-center rounded text-sm"
      :class="page === pageNumber ? 'text-white font-semibold bg-primary1' : 'hover:bg-primary2'"
      @click="onNumClick(page)">
      {{ page }}
    </button>
    <div class="flex gap-1 absolute right-0 top-1/2 translate-x-[calc(100%+8px)] -translate-y-1/2">
      <button
        v-if="pageNumber !== totalPage"
        @click="onNextClick"
        class="rounded hover:bg-primary2">
        <CommonIcons :name="nextIcon" />
      </button>
      <button
        v-if="pageSet[pageSet.length - 1] !== totalPage"
        @click="onNextSetClick"
        class="rounded hover:bg-primary2">
        <CommonIcons :name="nextSetIcon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextIcon, nextSetIcon, prevIcon, prevSetIcon } from '@/constants/iconPath'
import { computed } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { pageNumber, totalPage } = defineProps<{ pageNumber: number; totalPage: number }>()
const emit = defineEmits(['update:pageNumber'])

const pageSet = computed(() => {
  const set: number[] = []
  const startPage = Math.floor((pageNumber - 1) / 5) * 5 + 1
  for (let i = 0; i < 5; i++) {
    if (startPage + i > totalPage) break
    set.push(startPage + i)
  }
  return set
})

const onPrevSetClick = () => {
  const prevSetEnd = Math.floor((pageNumber - 1) / 5) * 5
  emit('update:pageNumber', prevSetEnd - 1)
}
const onPrevClick = () => {
  const prev = Math.max(pageNumber - 1, 1)
  emit('update:pageNumber', prev - 1)
}
const onNextClick = () => {
  const next = Math.min(pageNumber + 1, totalPage)
  emit('update:pageNumber', next - 1)
}
const onNextSetClick = () => {
  const nextSetStart = Math.floor((pageNumber - 1) / 5) * 5 + 6
  emit('update:pageNumber', nextSetStart - 1)
}
const onNumClick = (num: number) => {
  emit('update:pageNumber', num - 1)
}
</script>
