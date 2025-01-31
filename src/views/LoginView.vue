<template>
  <div class="max-w-400">
    <div class="py-16">
      <div class="text-4xl font-bold text-center">
        <p class="pb-2">TaskFlow</p>
        <p class="pb-2">로그인</p>
      </div>
      <p class="text-center font-bold text-body">아이디와 비밀번호를 입력해주세요</p>
    </div>
    <form
      @submit.prevent="handleLogin"
      class="mb-2">
      <div class="mb-6">
        <input
          type="text"
          id="nickname"
          v-model="nickname"
          placeholder="닉네임을 입력해주세요"
          required
          class="input-box" />
      </div>
      <div class="mb-8">
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="비밀번호를 입력해주세요"
          required
          class="input-box" />
      </div>
      <button
        type="submit"
        class="button-large-primary">
        로그인
      </button>
    </form>
    <div class="flex w-full justify-center">
      <RouterLink
        class="text-body font-bold text-[12px]"
        to="/pw-change-email"
        >비밀번호 재설정</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nickname = ref('')
const password = ref('')

const handleLogin = async () => {
  // 로그인 API 필요
}
</script>
