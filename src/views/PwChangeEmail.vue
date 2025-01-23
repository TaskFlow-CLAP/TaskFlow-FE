<template>
  <div class="max-w-md mx-auto p-10">
    <div class="py-16">
      <div class="text-4xl font-bold text-center">
        <p class="pb-2">비밀번호</p>
        <p class="pb-2">재설정</p>
      </div>
      <p class="text-center font-bold text-body">가입된 아이디와 이메일을 입력해주세요</p>
    </div>
    <form
      @submit.prevent="handleCheck"
      class="mb-2">
      <div class="mb-6">
        <input
          type="text"
          id="id"
          v-model="id"
          placeholder="아이디를 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div class="relative mb-6">
        <div class="absolute flex items-center right-4 h-full">
          <button
            type="button"
            @click="handleRequestEmail"
            class="bg-white text-xs py-2 px-4 border-[1px] border-primary1 rounded text-primary1">
            {{ requestEmail ? '재요청' : '인증 요청' }}
          </button>
        </div>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="이메일을 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div class="mb-8">
        <input
          type="text"
          :disabled="!requestEmail"
          id="checkCode"
          v-model="checkCode"
          placeholder="인증코드를 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <button
        type="submit"
        class="w-full py-4 px-4 bg-primary1 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
        확인
      </button>
    </form>
    <div class="flex w-full justify-center"></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import router from '../router/index'

export default {
  name: 'PwChangeEmailPage',
  setup() {
    const id = ref('')
    const email = ref('')
    const checkCode = ref('')
    const requestEmail = ref(false)

    const handleRequestEmail = () => {
      requestEmail.value = true
      //이메일 인증 코드 전송 API 추가 필요
    }

    const handleCheck = () => {
      //이메일 인증 코드 확인 API 추가 필요
      router.push('/pw-change')
    }

    return {
      id,
      email,
      checkCode,
      requestEmail,
      handleRequestEmail,
      handleCheck
    }
  }
}
</script>
