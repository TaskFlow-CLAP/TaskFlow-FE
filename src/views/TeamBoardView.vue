<template>
  <div class="max-w-1200 !pt-0">
    <div class="w-full flex flex-col gap-6 sticky top-[64px] pt-6 pb-6 bg-white">
      <TitleBar title="팀 작업 현황" />

      <TeamBoardFilterBar />
    </div>

    <div class="pt-16">
      <TeamBoard />
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import TeamBoard from '@/components/team-board/TeamBoard.vue'
import TeamBoardFilterBar from '@/components/team-board/TeamBoardFilterBar.vue'
</script>
