<template>
  <div class="max-w-400 h-screen flex flex-col justify-center items-center gap-16">
    <TitleContainer
      title="404 Error"
      :content="'요청하신 페이지는\n없는 페이지입니다'" />
    <button
      type="button"
      class="button-large-primary"
      @click="router.back()">
      이전으로
    </button>
  </div>
</template>

<script setup lang="ts">
import TitleContainer from '@/components/common/TitleContainer.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
