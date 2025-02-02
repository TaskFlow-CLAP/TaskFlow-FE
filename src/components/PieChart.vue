<template>
  <Pie
    v-if="labels.length !== 0"
    :data="teamData"
    :options="options" />
  <NoContent
    v-else
    content="데이터가 없습니다" />
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
  type ChartEvent,
  type ActiveElement
} from 'chart.js'
import NoContent from './lists/NoContent.vue'
ChartJS.register(Title, Tooltip, Legend, ArcElement, Colors)

const { labels, series } = defineProps<{ labels: string[]; series: number[] }>()
const emit = defineEmits(['onClick'])

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
  maintainAspectRatio: false,
  onClick: (event: ChartEvent, elements: ActiveElement[]) => {
    if (elements && elements.length > 0) {
      const clickedIndex = elements[0].index
      emit('onClick', labels[clickedIndex])
    }
  }
}
</script>
