<template>
  <div class="list-view">
    <TitleBar title="통계" />

    <div class="grow bg-primary2 rounded-lg grid grid-cols-2 gap-12 px-12 py-6 overflow-y-scroll">
      <StatisticsCard
        title="기간별 작업 요청량"
        statistics-type="REQUEST_BY_PERIOD"
        chart-type="line">
      </StatisticsCard>
      <StatisticsCategoryCard />
      <StatisticsCard
        title="기간별 완료 작업량"
        statistics-type="PROCESS_BY_PERIOD"
        chart-type="line">
      </StatisticsCard>
      <StatisticsCard
        title="담당자별 완료 작업량"
        statistics-type="PROCESS_BY_MANAGER"
        chart-type="pie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import StatisticsCard from '@/components/statistics/StatisticsCard.vue'
import StatisticsCategoryCard from '@/components/statistics/StatisticsCategoryCard.vue'
</script>
