<template>
  <div
    class="text-xs font-bold text-body gap-[2px] flex items-center"
    :style="{ width: width ? `${width}px` : '' }"
    :class="`${!width && 'grow'} ${justifyCenter && 'justify-center'}`">
    {{ content }}
    <button
      v-if="sortBy"
      @click="$emit('toggleSortBy', sortBy)">
      <OrderIcon
        :is-active="params.orderRequest.sortBy === sortBy"
        :class="params.orderRequest.sortDirection === 'ASC' && 'rotate-180'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMyRequestParamsStore } from '@/stores/params'
import OrderIcon from '../OrderIcon.vue'
import type { ListBarTabProps } from '@/types/common'

const { content, width, sortBy } = defineProps<ListBarTabProps>()
defineEmits(['toggleSortBy'])

const { params } = useMyRequestParamsStore()
</script>
