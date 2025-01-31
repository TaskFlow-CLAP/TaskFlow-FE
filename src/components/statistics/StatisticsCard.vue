<template>
  <div
    class="flex flex-col h-fit gap-3 px-4 py-4 border-l-8 border-primary1 bg-white rounded-lg shadow-custom">
    <div class="flex flex-col gap-2">
      <span class="font-bold text-black">{{ title }}</span>
      <PeriodButtons
        :period-type="periodType"
        @update:period="changePeriod" />
    </div>
    <div class="w-full h-[1px] bg-border-1" />
    <div class="h-60">
      <PieChart
        v-if="chartType === 'pie'"
        :labels="['a', 'b', 'c']"
        :series="[1, 2, 3]" />
      <LineChart
        v-if="chartType === 'line'"
        :labels="['a', 'b', 'c']"
        :series="[1, 2, 3]"
        :data-label="title.slice(4)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PieChart from '../PieChart.vue'
import LineChart from '../LineChart.vue'
import PeriodButtons from './PeriodButtons.vue'
import type { PeriodType, StatisticsCardProps } from '@/types/manager'

const { title, statisticsType, chartType } = defineProps<StatisticsCardProps>()

const periodType = ref<PeriodType>('DAY')
const changePeriod = (newPeriodType: PeriodType) => {
  periodType.value = newPeriodType
}
</script>
