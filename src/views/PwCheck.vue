<template>
  <div class="max-w-400">
    <div class="py-16">
      <TitleContainer
        :title="'비밀번호\n재설정'"
        content="비밀번호 재설정을 위해\n현재 비밀번호를 입력해주세요" />
    </div>
    <form
      @submit.prevent="handleCheck"
      class="mb-2">
      <div class="mb-6">
        <input
          type="password"
          id="pw"
          v-model="pw"
          placeholder="비밀번호를 입력해주세요"
          required
          class="input-box" />
      </div>
      <div class="mb-8">
        <button
          type="submit"
          class="button-large-primary">
          확인
        </button>
      </div>
    </form>
    <div class="flex w-full justify-center"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../router/index'
import TitleContainer from '@/components/common/TitleContainer.vue'

const pw = ref('')

const handleCheck = () => {
  // 기존 비밀번호 확인 API 추가 필요
  router.push('/pw-change')
}
</script>
