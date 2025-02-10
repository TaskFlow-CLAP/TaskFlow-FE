<template>
  <div class="max-w-400">
    <ModalView
      :is-open="isModalVisible"
      type="failType"
      @close="closeModal">
      <template #header>{{ messageHeader }}</template>
      <template #body>{{ messageBody }}</template>
    </ModalView>
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
import { postLogin } from '@/api/auth'
import ModalView from '@/components/common/ModalView.vue'
import TitleContainer from '@/components/common/TitleContainer.vue'
import { useMemberStore } from '@/stores/member'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nickname = ref('')
const password = ref('')
const memberStore = useMemberStore()

const messageHeader = ref('')
const messageBody = ref('')

const isModalVisible = ref(false)

const closeModal = () => {
  isModalVisible.value = false
}

const handleLogin = async () => {
  try {
    const loginData = {
      nickname: nickname.value,
      password: password.value
    }
    const res = await postLogin(loginData)
    const role = await memberStore.updateMemberInfoWithToken()

    if (!Cookies.get('refreshToken')) {
      router.push('/pw-change')
    } else if (res && role && Cookies.get('refreshToken')) {
      switch (role) {
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
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 401:
          isModalVisible.value = !isModalVisible.value
          messageHeader.value = '일치하는 정보가 없습니다'
          messageBody.value = '닉네임과 비밀번호를 다시 확인해 주세요'
          break

        case 500:
          isModalVisible.value = !isModalVisible.value
          messageHeader.value = '서버에 문제가 발생했습니다'
          messageBody.value = '잠시후 다시 이용해주세요'
          break
      }
    }
  }
}
</script>
