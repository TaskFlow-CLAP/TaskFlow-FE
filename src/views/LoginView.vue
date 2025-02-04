<template>
  <div class="max-w-400">
    <div class="py-16">
      <TitleContainer
        :title="'TaskFlow\n로그인'"
        content="아이디와 비밀번호를 입력해주세요" />
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
import { useRouter } from 'vue-router'
import { postLogin } from '@/api/auth'
import TitleContainer from '@/components/common/TitleContainer.vue'

const router = useRouter()

const nickname = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const loginData = {
      nickname: nickname.value,
      password: password.value
    }
    const sessionId = '000'
    const res = await postLogin(loginData, sessionId)

    if (res) {
      switch (res.memberInfo.memberRole) {
        case 'ROLE_ADMIN':
          router.push('/member-management')
          break
        case 'ROLE_MANAGER':
          router.push('my-request')
          break
        case 'ROLE_USER':
          router.push('/my-request')
          break
        default:
          router.push('/')
      }
    }
  } catch (error) {
    // 로그인 실패 시 에러 처리
    console.error('로그인 실패:', error)
  }
}
</script>
