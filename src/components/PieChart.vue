<template>
  <Pie
    v-if="labels.length !== 0"
    :data="teamData"
    :options="options" />
  <NoContent
    v-else
    :content="
      !content && periodType ? `집계된 ${periodText[periodType]} 데이터가 없습니다` : content
    " />
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
import type { PeriodType } from '@/types/manager'
ChartJS.register(Title, Tooltip, Legend, ArcElement, Colors)

const { labels, series, periodType, content } = defineProps<{
  labels: string[]
  series: number[]
  periodType?: PeriodType
  content?: string
}>()
const emit = defineEmits(['onClick'])

const periodText = { DAY: '일간', WEEK: '주간', MONTH: '월간' }

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
