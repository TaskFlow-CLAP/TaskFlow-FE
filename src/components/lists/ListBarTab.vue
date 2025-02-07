<template>
  <div
    class="text-xs font-bold text-body gap-[2px] flex items-center"
    :style="{ width: width ? `${width}px` : '' }"
    :class="`${!width && 'grow'} ${justifyCenter && 'justify-center'}`">
    {{ content }}
    <button
      type="button"
      v-if="sortBy"
      @click="$emit('toggleSortBy', sortBy)">
      <OrderIcon
        :is-active="isActive"
        :class="isASC && 'rotate-180'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ListBarTabProps } from '@/types/common'
import { computed } from 'vue'
import OrderIcon from '../OrderIcon.vue'

const { content, width, sortBy, currentOrderRequest } = defineProps<ListBarTabProps>()
defineEmits(['toggleSortBy'])

const isActive = computed(() => {
  return sortBy === currentOrderRequest?.sortBy
})
const isASC = computed(() => {
  return currentOrderRequest?.sortDirection === 'ASC'
})
</script>
