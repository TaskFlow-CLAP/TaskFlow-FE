<template>
  <div class="w-full h-full flex items-center justify-center">
    <Pie
      v-if="labels.length !== 0"
      :data="teamData"
      :options="options" />
    <NoContent
      v-else-if="!isPending && labels.length === 0"
      :content="
        !content && periodType
          ? `지난 ${periodText[periodType]}간 집계된\n데이터가 없습니다`
          : content
      " />
  </div>
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
import type { PeriodType } from '@/types/manager'
import NoContent from '../lists/NoContent.vue'
ChartJS.register(Title, Tooltip, Legend, ArcElement, Colors)

const { labels, series, periodType, content, isPending, noLegend, title } = defineProps<{
  labels: string[]
  series: number[]
  periodType?: PeriodType
  content?: string
  isPending?: boolean
  noLegend?: boolean
  title?: string
}>()
const emit = defineEmits(['onClick'])

const periodText = { DAY: '1일', WEEK: '1주일', MONTH: '1개월' }

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
  },
  hoverOffset: 10,
  plugins: {
    legend: {
      display: noLegend === true ? false : true,
      position: 'left' as const
    },
    tooltip: { enabled: true },
    title: {
      display: title ? true : false,
      text: title,
      font: { size: 12, weight: 400 },
      color: '#71717A'
    }
  },
  layout: {
    padding: {
      left: 8,
      right: 8,
      bottom: 8
    }
  }
}
</script>
