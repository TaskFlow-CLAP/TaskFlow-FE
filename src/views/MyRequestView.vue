<template>
  <div class="max-w-1200 h-screen flex flex-col gap-6 overflow-hidden">
    <TitleBar
      title="내 요청"
      btn="새 요청 생성"
      @button-click="createNewRequest" />

    <MyRequestFilterBar />

    <MyRequestList />
  </div>
</template>

<script setup lang="ts">
import MyRequestFilterBar from '@/components/my-request/MyRequestFilterBar.vue'
import MyRequestList from '@/components/my-request/MyRequestList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const createNewRequest = () => {
  router.push('/new-request')
}
</script>

<style scoped></style>
