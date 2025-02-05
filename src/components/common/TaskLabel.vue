<template>
  <span
    class="px-2 py-0.5 text-[10px] font-bold border-2 rounded-full whitespace-nowrap"
    :style="{ borderColor, backgroundColor }">
    {{ content }}
  </span>
</template>

<script setup lang="ts">
import { COLOR_LIST } from '@/constants/common'

const { color, content } = defineProps<{ color: string; content: string }>()
const [borderColor, backgroundColor] = [
  COLOR_LIST.find(el => el.colorEnum === color)?.borderColor,
  COLOR_LIST.find(el => el.colorEnum === color)?.fillColor
]
</script>
