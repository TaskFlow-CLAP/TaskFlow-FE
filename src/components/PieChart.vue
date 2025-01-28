<template>
  <Pie
    :data="teamData"
    :options="options" />
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const { labels, series } = defineProps<{ labels: string[]; series: number[] }>()

const teamData = {
  labels,
  datasets: [
    {
      backgroundColor: generateRandomColors(labels.length),
      data: series
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

function generateRandomColors(count: number): string[] {
  return Array.from({ length: count }, () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`)
}
</script>
