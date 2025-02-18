<template>
  <div
    class="text-xs font-semibold text-body gap-[2px] flex items-center"
    :style="{ width: width ? `${width}px` : '' }"
    :class="`${!width && 'grow'} ${justifyCenter && 'justify-center'}`">
    {{ content }}
    <button
      class="relative"
      type="button"
      v-if="sortBy"
      @click="$emit('toggleSortBy', sortBy)">
      <OrderIcon
        :is-active="isActive"
        :class="isASC && 'rotate-180'" />
      <span class="hidden-text">정렬</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ListBarTabProps } from '@/types/common'
import { computed } from 'vue'
import OrderIcon from '../common/OrderIcon.vue'

const { content, width, sortBy, currentOrderRequest } = defineProps<ListBarTabProps>()
defineEmits(['toggleSortBy'])

const isActive = computed(() => {
  return sortBy === currentOrderRequest?.sortBy
})
const isASC = computed(() => {
  return currentOrderRequest?.sortDirection === 'ASC'
})
</script>
