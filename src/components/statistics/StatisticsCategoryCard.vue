<template>
  <div
    class="flex flex-col h-fit gap-3 px-4 py-4 border-l-8 border-primary1 bg-white rounded-lg shadow-custom">
    <div class="flex flex-col gap-2">
      <span class="font-semibold">카테고리별 작업 요청량</span>
      <PeriodButtons
        :period-type="periodType"
        @update:period="changePeriod" />
    </div>
    <div class="w-full h-[1px] bg-border-1" />
    <div class="h-60 flex overflow-hidden">
      <div class="w-1/2 px-1">
        <PieChart
          :key="JSON.stringify(mainLabels) + periodType"
          :labels="mainLabels"
          :series="mainSeries"
          :period-type="periodType"
          @on-click="changeMainCategory"
          :is-pending="isMainPending"
          title="1차 카테고리"
          no-legend />
      </div>
      <div class="w-1/2 px-1">
        <PieChart
          :key="JSON.stringify(subLabels) + mainCategory + periodType"
          :labels="subLabels"
          :series="subSeries"
          :period-type="periodType"
          :content="!mainCategory ? '1차 카테고리를\n선택해주세요' : ''"
          :is-pending="isSubPending"
          :title="mainCategory"
          no-legend />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PeriodButtons from './PeriodButtons.vue'
import type { PeriodType } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import type { StatisticsData } from '@/types/admin'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import PieChart from '../charts/PieChart.vue'

const periodType = ref<PeriodType>('DAY')
const changePeriod = (newPeriodType: PeriodType) => {
  periodType.value = newPeriodType
  mainCategory.value = ''
}

const mainCategory = ref('')
const changeMainCategory = (value: string) => (mainCategory.value = value)

const fetchMainStatistics = async () => {
  const response = await axiosInstance.get('/api/tasks/statistics', {
    params: {
      periodType: periodType.value,
      statisticsType: 'REQUEST_BY_CATEGORY'
    }
  })

  return response.data
}
const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)
const { data: mainData, isPending: isMainPending } = useQuery<StatisticsData[]>({
  queryKey: computed(() => ['REQUEST_BY_CATEGORY', periodType]),
  queryFn: fetchMainStatistics,
  enabled: isLogined
})
const mainLabels = computed(() => {
  return mainData.value?.map(el => el.key) || []
})
const mainSeries = computed(() => {
  return mainData.value?.map(el => el.count) || []
})

const fetchSubStatistics = async () => {
  if (!isLogined.value) return
  const response = await axiosInstance.get('/api/tasks/statistics/subcategory', {
    params: {
      periodType: periodType.value,
      mainCategory: mainCategory.value
    }
  })

  return response.data
}
const { data: subData, isPending: isSubPending } = useQuery<StatisticsData[]>({
  queryKey: computed(() => [mainCategory.value, periodType]),
  queryFn: fetchSubStatistics,
  enabled: computed(() => mainCategory.value !== '') && isLogined
})
const subLabels = computed(() => {
  return subData.value?.map(el => el.key) || []
})
const subSeries = computed(() => {
  return subData.value?.map(el => el.count) || []
})
</script>
