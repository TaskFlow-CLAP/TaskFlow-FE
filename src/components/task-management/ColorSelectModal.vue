<template>
  <div
    v-if="isOpen && labelId === selectedLabelId"
    class="absolute top-7 left-3 w-[176px] h-[120px] p-4 flex flex-col z-50 shadow-custom rounded-lg bg-white gap-4"
    @click.self="closeModal">
    <div class="flex w-full justify-between">
      <p class="text-xs font-bold text-body">색상 선택</p>
      <CommonIcons
        :class="'cursor-pointer'"
        :name="closeIcon"
        @click="closeModal" />
    </div>
    <div class="flex-wrap flex w-full gap-4 bg-white gap-y-2">
      <div
        v-for="color in COLOR_LIST"
        :key="color.fillColor"
        :style="{ borderColor: color.borderColor, backgroundColor: color.fillColor }"
        class="w-6 h-6 rounded-full border-[3px] cursor-pointer"
        @click="updateColor(color.fillColor)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COLOR_LIST } from '@/constants/common'
import { closeIcon } from '@/constants/iconPath'
import type { ColorSelectProps } from '@/types/common'
import { defineEmits, defineProps } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const props = defineProps<ColorSelectProps>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}

const updateColor = (color: string) => {
  console.log(props.labelId, '로 색상 변경 로직', color)
  emit('close')
}
</script>
