<template>
  <div class="max-w-1200 h-screen flex flex-col gap-6 overflow-hidden">
    <TitleBar title="팀 작업 현황" />

    <TeamBoardFilterBar />

    <TeamBoard />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import TeamBoard from '@/components/team-board/TeamBoard.vue'
import TeamBoardFilterBar from '@/components/team-board/TeamBoardFilterBar.vue'
</script>
