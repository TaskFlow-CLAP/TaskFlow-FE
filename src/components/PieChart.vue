<template>
  <Pie
    :data="teamData"
    :options="options" />
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, Colors } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, Colors)

const { labels, series } = defineProps<{ labels: string[]; series: number[] }>()

const teamData = {
  labels,
  datasets: [
    {
      data: series
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
