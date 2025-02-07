<template>
  <div class="text-xs font-bold flex gap-4">
    <button
      type="button"
      @click="changePeriod('DAY')"
      :class="
        periodType === 'DAY'
          ? 'button-small-primary underline'
          : 'button-small-default hover:underline'
      ">
      일간
    </button>
    <button
      type="button"
      @click="changePeriod('WEEK')"
      :class="
        periodType === 'WEEK'
          ? 'button-small-primary underline'
          : 'button-small-default hover:underline'
      ">
      주간
    </button>
    <button
      type="button"
      @click="changePeriod('MONTH')"
      :class="
        periodType === 'MONTH'
          ? 'button-small-primary underline'
          : 'button-small-default hover:underline'
      ">
      월간
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PeriodType } from '@/types/manager'

const { periodType } = defineProps<{ periodType: PeriodType }>()
const emit = defineEmits(['update:period'])

const changePeriod = (periodType: PeriodType) => {
  emit('update:period', periodType)
}
</script>
