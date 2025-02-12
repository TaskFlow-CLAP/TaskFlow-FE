<template>
  <Line
    v-if="labels.length !== 0"
    :data="teamData"
    :options="options" />
  <NoContent
    v-else
    :content="`집계된 ${periodText[periodType]} 데이터가 없습니다`" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Colors,
  Filler
} from 'chart.js'
import type { PeriodType } from '@/types/manager'
import NoContent from '../lists/NoContent.vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Colors,
  Filler
)

const { labels, series, dataLabel, periodType } = defineProps<{
  labels: string[]
  series: number[]
  dataLabel: string
  periodType: PeriodType
}>()

const periodText = { DAY: '일간', WEEK: '주간', MONTH: '월간' }

const teamData = {
  labels,
  datasets: [
    {
      label: dataLabel,
      data: series,
      fill: true
    }
  ]
}

const calculateStepSize = (data: number[]) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min

  if (range <= 10) return 1
  if (range <= 100) return 5
  if (range <= 1000) return 50
  return Math.ceil(range / 10)
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        stepSize: calculateStepSize(series),
        maxTicksLimit: 10,
        autoSkip: true
      },
      suggestedMax: Math.max(...series) + 1
    }
  }
}
</script>
