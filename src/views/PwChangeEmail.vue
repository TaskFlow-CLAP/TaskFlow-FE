<template>
  <div class="max-w-400">
    <ModalView
      :isOpen="isModalVisible"
      type="successType"
      @close="closeModal">
      <template #header> 인증 번호가 전송되었습니다 </template>
      <template #body> 이메일을 확인해주세요 </template>
    </ModalView>
    <ModalView
      :isOpen="isFailModalVisible"
      type="failType"
      @close="closeFailModal">
      <template #header> {{ messageHeader }} </template>
      <template #body> {{ messageBody }}</template>
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
import { postPasswordEmailSend } from '@/api/auth'
import TitleContainer from '@/components/common/TitleContainer.vue'
import axios from 'axios'
import { ref } from 'vue'
import router from '../router/index'
import ModalView from '@/components/common/ModalView.vue'

const messageHeader = ref('')
const messageBody = ref('')
const isModalVisible = ref(false)
const isFailModalVisible = ref(false)

const name = ref('')
const email = ref('')

const closeModal = () => {
  isModalVisible.value = !isModalVisible.value
  router.replace('/login')
}
const closeFailModal = () => {
  isFailModalVisible.value = !isFailModalVisible.value
}

const handleCheck = async () => {
  try {
    await postPasswordEmailSend(name.value, email.value)
    isModalVisible.value = !isModalVisible.value
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error?.response?.status) {
        case 404:
          isFailModalVisible.value = !isFailModalVisible.value
          messageHeader.value = '일치하는 정보가 없습니다'
          messageBody.value = '이메일과 이름을 다시 확인해 주세요'
          break

        case 500:
          isFailModalVisible.value = !isFailModalVisible.value
          messageHeader.value = '서버에 문제가 발생했습니다'
          messageBody.value = '잠시후 다시 이용해주세요'
          break

        default:
          isFailModalVisible.value = !isFailModalVisible.value
          messageHeader.value = '문제가 발생했습니다'
          messageBody.value = '잠시후 다시 이용해주세요'
          break
      }
    }
  }
}
</script>
