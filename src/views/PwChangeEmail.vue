<template>
  <div class="max-w-md mx-auto p-10">
    <ModalView
      :isOpen="isModalOpen"
      :type="'inputType'"
      @close="toggleModal">
      <template #header> 인증 번호가 전송되었습니다 </template>
      <template #body> 이메일을 확인해주세요 </template>
    </ModalView>
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
          class="input-box" />
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
          class="input-box" />
      </div>
      <div class="mb-8">
        <input
          type="text"
          :disabled="!requestEmail"
          id="checkCode"
          v-model="checkCode"
          placeholder="인증코드를 입력해주세요"
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

const id = ref('')
const email = ref('')
const checkCode = ref('')
const requestEmail = ref(false)
const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleRequestEmail = () => {
  toggleModal()
  requestEmail.value = true
  // 이메일 인증 코드 전송 API 추가 필요
}

const handleCheck = () => {
  // 이메일 인증 코드 확인 API 추가 필요
  router.push('/pw-change')
}
</script>
