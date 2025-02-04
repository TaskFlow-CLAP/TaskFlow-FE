<template>
  <Line
    v-if="labels.length !== 0"
    :data="teamData"
    :options="options" />
  <NoContent
    v-else
    content="데이터가 없습니다" />
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
  Colors
} from 'chart.js'
import NoContent from './lists/NoContent.vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Colors
)

const { labels, series, dataLabel } = defineProps<{
  labels: string[]
  series: number[]
  dataLabel: string
}>()

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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      },
      suggestedMax: Math.max(...series) + 1
    }
  }
}
</script>
