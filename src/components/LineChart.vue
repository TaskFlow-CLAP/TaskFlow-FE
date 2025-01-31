<template>
  <Line
    :data="teamData"
    :options="options" />
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
      fill: true,
      tension: 0.4
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
