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
      class="flex flex-col gap-8">
      <div class="relative">
        <input
          type="text"
          id="id"
          v-model="id"
          placeholder="아이디를 입력해주세요"
          required
          class="input-box"
          autocomplete="username" />
      </div>
      <div class="relative">
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="비밀번호를 입력해주세요"
          required
          class="input-box"
          autocomplete="current-password" />
      </div>
      <div class="flex flex-col gap-2 items-center">
        <button
          type="submit"
          class="button-large-primary">
          로그인
        </button>
        <RouterLink
          class="flex justify-center text-body font-semibold text-xs hover:underline"
          to="/pw-change-email">
          비밀번호 재설정
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { postLogin } from '@/api/auth'
import ModalView from '@/components/common/ModalView.vue'
import TitleContainer from '@/components/common/TitleContainer.vue'
import { useMemberStore } from '@/stores/member'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const id = ref('')
const password = ref('')
const memberStore = useMemberStore()

const messageHeader = ref('')
const messageBody = ref('')

const isModalVisible = ref(false)

const closeModal = () => {
  isModalVisible.value = false
}

const handleLogin = async () => {
  const name = id.value.toString()
  const res = await postLogin(name, password.value)
  const role = await memberStore.updateMemberInfoWithToken()

  if (memberStore.isPendingUser) {
    router.push('/pw-change')
  } else if (res) {
    switch (role) {
      case 'ROLE_ADMIN':
        router.push('/member-management')
        break
      case 'ROLE_MANAGER':
        router.push('my-task')
        break
      case 'ROLE_USER':
        router.push('/my-request')
        break
      default:
        router.push('/')
    }
  }
}
</script>
