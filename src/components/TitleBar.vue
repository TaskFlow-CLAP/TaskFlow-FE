<template>
  <div class="flex justify-between items-center px-6 py-3 border-l-8 border-primary1">
    <span class="text-2xl font-bold text-black">{{ props.title }}</span>
    <button
      v-if="btn"
      class="flex items-center gap-1 text-xs font-bold text-primary1"
      @click="$emit('buttonClick')">
      <CommonIcons
        :name="plusIcon"
        :style="{ fill: '#7879EB' }" />
      {{ props.btn }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { plusIcon } from '@/constants/iconPath'
import type { TitleBarProps } from '@/types/common'
import CommonIcons from './common/CommonIcons.vue'

const props = defineProps<TitleBarProps>()
defineEmits(['buttonClick'])
</script>
