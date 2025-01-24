<template>
  <div class="max-w-md mx-auto p-10">
    <div class="py-16">
      <div class="text-4xl font-bold text-center">
        <p class="pb-2">비밀번호</p>
        <p class="pb-2">재설정</p>
      </div>
      <p class="text-center font-semibold text-body">
        비밀번호 재설정을 위해<br />현재 비밀번호를 입력해주세요
      </p>
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
          class="block w-full px-4 py-4 border border-zinc-300 rounded focus:outline-none" />
      </div>
      <div class="mb-8">
        <button
          type="submit"
          class="button-large-">
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

const pw = ref('')

const handleCheck = () => {
  // 기존 비밀번호 확인 API 추가 필요
  router.push('/pw-change')
}
</script>
