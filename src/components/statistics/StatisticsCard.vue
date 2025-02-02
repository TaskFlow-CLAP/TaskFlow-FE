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
        :key="JSON.stringify(labels)"
        v-if="chartType === 'pie'"
        :labels="labels || []"
        :series="series || []" />
      <LineChart
        :key="JSON.stringify(labels)"
        v-if="chartType === 'line'"
        :labels="labels || []"
        :series="series || []"
        :data-label="title.slice(4)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PieChart from '../PieChart.vue'
import LineChart from '../LineChart.vue'
import PeriodButtons from './PeriodButtons.vue'
import type { PeriodType } from '@/types/manager'
import axiosInstance from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'

const { title, statisticsType, chartType } = defineProps<{
  title: string
  statisticsType: StatisticsType
  chartType: 'line' | 'pie'
}>()

type StatisticsType =
  | 'REQUEST_BY_PERIOD'
  | 'PROCESS_BY_PERIOD'
  | 'REQUEST_BY_CATEGORY'
  | 'PROCESS_BY_MANAGER'

const periodType = ref<PeriodType>('DAY')
const changePeriod = (newPeriodType: PeriodType) => {
  periodType.value = newPeriodType
}

const fetchStatistics = async () => {
  const response = await axiosInstance.get('/api/tasks/statistics', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
    },
    params: {
      periodType: periodType.value,
      statisticsType
    }
  })

  return response.data
}

const { data } = useQuery<{ key: string; count: number }[]>({
  queryKey: [statisticsType, periodType],
  queryFn: fetchStatistics
})

const labels = computed(() => {
  return data.value?.map(el => el.key)
})

const series = computed(() => {
  return data.value?.map(el => el.count)
})
</script>
