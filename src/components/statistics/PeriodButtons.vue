<template>
  <div class="text-xs font-semibold flex gap-2 text-disabled">
    <span class="text-primary1">지난</span>
    <div class="flex gap-2">
      <button
        type="button"
        @click="changePeriod('DAY')"
        :class="
          periodType === 'DAY'
            ? 'button-small-primary underline'
            : 'button-small-default hover:underline'
        ">
        1일
      </button>
      |
      <button
        type="button"
        @click="changePeriod('WEEK')"
        :class="
          periodType === 'WEEK'
            ? 'button-small-primary underline'
            : 'button-small-default hover:underline'
        ">
        1주일
      </button>
      |
      <button
        type="button"
        @click="changePeriod('MONTH')"
        :class="
          periodType === 'MONTH'
            ? 'button-small-primary underline'
            : 'button-small-default hover:underline'
        ">
        1개월
      </button>
    </div>
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
