<template>
  <div class="max-w-md mx-auto p-10">
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
      <div class="mb-3">
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="아이디를 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div class="mt-3 mb-8">
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="비밀번호를 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <button
        type="submit"
        class="w-full py-4 px-4 bg-primary1 text-white rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500">
        로그인
      </button>
    </form>
    <div class="flex w-full justify-center">
      <RouterLink
        class="text-body font-bold text-[12px]"
        to="/pw-change"
        >비밀번호 재설정</RouterLink
      >
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'LoginPage',
  setup() {
    const username = ref('')
    const password = ref('')

    const handleLogin: () => void = () => {
      if (username.value === 'asdf' && password.value === 'asdf') {
        alert('로그인 성공!')
      } else {
        alert('아이디나 비밀번호가 잘못되었습니다.')
      }
    }

    return {
      username,
      password,
      handleLogin
    }
  }
}
</script>
