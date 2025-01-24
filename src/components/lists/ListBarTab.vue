<template>
  <div
    class="text-xs font-bold text-body gap-[2px] flex items-center"
    :style="{ width: width ? `${width}px` : '' }"
    :class="!width && 'grow'">
    {{ content }}
    <button
      v-if="orderTarget"
      @click="$emit('toggleOrder', orderTarget)">
      <OrderIcon
        :is-active="params.order.target === orderTarget"
        :class="params.order.type === 'ASC' && 'rotate-180'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMyRequestParamsStore } from '@/stores/params'
import OrderIcon from '../OrderIcon.vue'

const { content, width, orderTarget } = defineProps<{
  content: string
  width?: number
  orderTarget?: string
}>()
defineEmits(['toggleOrder'])

const { params } = useMyRequestParamsStore()
</script>
