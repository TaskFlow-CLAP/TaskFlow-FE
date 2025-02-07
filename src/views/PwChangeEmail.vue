<template>
  <div class="max-w-400">
    <ModalView
      :isOpen="isModalOpen"
      type="successType"
      @close="closeModal">
      <template #header> 인증 번호가 전송되었습니다 </template>
      <template #body> 이메일을 확인해주세요 </template>
    </ModalView>
    <div class="py-16">
      <TitleContainer
        :title="'비밀번호\n재설정'"
        content="가입된 이메일과 이름을 입력해주세요" />
    </div>
    <form
      @submit.prevent="handleCheck"
      class="mb-2">
      <div class="mb-6">
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="이메일 입력해주세요"
          required
          class="input-box" />
      </div>
      <div class="relative mb-8">
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="이름을 입력해주세요"
          required
          class="input-box" />
      </div>
      <button
        type="submit"
        class="button-large-primary">
        확인
      </button>
    </form>
    <div class="flex w-full justify-center"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../router/index'
import ModalView from '../components/ModalView.vue'
import TitleContainer from '@/components/common/TitleContainer.vue'
import { postPasswordEmailSend } from '@/api/auth'

const name = ref('')
const email = ref('')
const isModalOpen = ref(false)

const closeModal = () => {
  isModalOpen.value = !isModalOpen.value
  router.push('/login')
}

const handleCheck = () => {
  postPasswordEmailSend(name.value, email.value)
  isModalOpen.value = !isModalOpen.value
}
</script>
