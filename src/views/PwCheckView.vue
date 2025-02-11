<template>
  <div class="max-w-400">
    <div class="py-16">
      <ModalView
        :is-open="isModalVisible"
        type="failType"
        @close="closeModal">
        <template #header>{{ messageHeader }}</template>
        <template #body>{{ messageBody }}</template>
      </ModalView>
      <TitleContainer
        :title="'비밀번호\n재설정'"
        :content="'비밀번호 재설정을 위해\n현재 비밀번호를 입력해주세요'" />
    </div>
    <form
      @submit.prevent="handleCheck"
      class="flex flex-col gap-8">
      <input
        type="password"
        id="pw"
        v-model="pw"
        placeholder="비밀번호를 입력해주세요"
        required
        class="input-box" />
      <div class="flex flex-col gap-2">
        <button
          type="submit"
          class="button-large-primary">
          확인
        </button>
        <button
          type="button"
          class="flex w-full justify-center text-xs font-bold text-body hover:underline"
          @click="router.back()">
          이전으로
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { postPasswordCheck } from '@/api/auth'
import TitleContainer from '@/components/common/TitleContainer.vue'
import axios from 'axios'
import { ref } from 'vue'
import router from '../router/index'
import ModalView from '@/components/common/ModalView.vue'

const isModalVisible = ref(false)

const messageHeader = ref('')
const messageBody = ref('')

const closeModal = () => {
  isModalVisible.value = false
}

const pw = ref('')

const handleCheck = async () => {
  try {
    await postPasswordCheck(pw.value)
    router.push('/pw-change')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error?.response?.status) {
        case 400:
          isModalVisible.value = !isModalVisible.value
          messageHeader.value = '비밀번호가 일치하지 않습니다'
          messageBody.value = '다시 확인해주세요'
          break

        case 401:
          isModalVisible.value = !isModalVisible.value
          messageHeader.value = '비밀번호가 일치하지 않습니다'
          messageBody.value = '다시 확인해주세요'
          break

        case 500:
          isModalVisible.value = !isModalVisible.value
          messageHeader.value = '서버에 문제가 발생했습니다'
          messageBody.value = '잠시 후 다시 이용해주세요'
          break

        default:
          isModalVisible.value = !isModalVisible.value
          messageHeader.value = '문제가 발생했습니다'
          messageBody.value = '잠시 후 다시 이용해주세요'
          break
      }
    }
  }
}
</script>
