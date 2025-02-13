<template>
  <div class="max-w-400">
    <ModalView
      :isOpen="isModalVisible"
      type="successType"
      @close="closeModal">
      <template #header>
        <span class="whitespace-pre-wrap text-center">
          {{ '새로운 비밀번호가\n전송되었습니다' }}
        </span>
      </template>
      <template #body>이메일을 확인해주세요</template>
    </ModalView>
    <ModalView
      :isOpen="isFailModalVisible"
      type="failType"
      @close="closeFailModal">
      <template #header>{{ messageHeader }}</template>
      <template #body>{{ messageBody }}</template>
    </ModalView>
    <div class="py-16">
      <TitleContainer
        :title="'비밀번호\n재설정'"
        content="가입된 이메일과 이름을 입력해주세요" />
    </div>
    <form
      @submit.prevent="handleCheck"
      class="flex flex-col gap-8">
      <div class="relative">
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="이메일을 입력해주세요"
          required
          class="input-box" />
      </div>
      <div class="relative">
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="이름을 입력해주세요"
          required
          class="input-box" />
      </div>
      <div class="flex flex-col gap-2 items-center">
        <button
          type="submit"
          class="button-large-primary">
          확인
        </button>
        <RouterLink
          class="flex justify-center text-xs font-semibold text-body hover:underline"
          to="/login">
          로그인
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { postPasswordEmailSend } from '@/api/auth'
import TitleContainer from '@/components/common/TitleContainer.vue'
import { ref } from 'vue'
import ModalView from '@/components/common/ModalView.vue'
import { useRouter } from 'vue-router'

const messageHeader = ref('')
const messageBody = ref('')
const isModalVisible = ref(false)
const isFailModalVisible = ref(false)

const name = ref('')
const email = ref('')

const router = useRouter()

const closeModal = () => {
  router.push('/login')
}
const closeFailModal = () => {
  isFailModalVisible.value = !isFailModalVisible.value
}

const handleCheck = async () => {
  const id = email.value.split('@')[0]
  try {
    await postPasswordEmailSend(name.value, email.value, id)
    isModalVisible.value = !isModalVisible.value
  } catch {
    messageHeader.value = '으에?'
    messageBody.value = '으에?'
  }
}
</script>
