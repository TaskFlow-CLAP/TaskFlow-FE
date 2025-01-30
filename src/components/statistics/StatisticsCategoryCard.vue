<template>
  <div
    class="flex flex-col h-fit gap-3 px-4 py-4 border-l-8 border-primary1 bg-white rounded-lg shadow-custom">
    <div class="flex flex-col gap-2">
      <span class="font-bold text-black">카테고리별 작업 요청량</span>
      <PeriodButtons
        :period-type="periodType"
        @update:period="changePeriod" />
    </div>
    <div class="w-full h-[1px] bg-border-1" />
    <div class="h-60 flex overflow-hidden">
      <div class="w-1/2 px-1">
        <PieChart
          :labels="['a', 'b', 'c', 'd']"
          :series="[1, 2, 3, 4]"
          @on-click="changeMainCategory" />
      </div>
      <div class="w-1/2 px-1">
        <PieChart
          :key="mainCategory"
          :labels="
            mainCategory
              ? [`${mainCategory}-1`, `${mainCategory}-2`, `${mainCategory}-3`, `${mainCategory}-4`]
              : ['카테고리를 선택해주세요']
          "
          :series="mainCategory ? [1, 2, 3, 4] : []" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PieChart from '../PieChart.vue'
import PeriodButtons from './PeriodButtons.vue'
import type { PeriodType } from '@/types/manager'

const periodType = ref<PeriodType>('DAY')
const changePeriod = (newPeriodType: PeriodType) => {
  periodType.value = newPeriodType
}

const mainCategory = ref('')
const changeMainCategory = (value: string) => (mainCategory.value = value)
</script>
