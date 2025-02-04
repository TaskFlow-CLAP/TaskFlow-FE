<template>
  <div class="max-w-400">
    <ModalView
      :isOpen="isModalOpen"
      type="successType"
      @close="pwChange">
      <template #header> 비밀번호가 변경 되었습니다 </template>
      <template #body> 다시 로그인 해주세요 </template>
    </ModalView>
    <div class="py-16">
      <TitleContainer
        :title="'비밀번호\n재설정'"
        content="초기 비밀번호를 변경해주세요" />
    </div>
    <form
      @submit.prevent="handleChange"
      class="mb-2">
      <div class="mb-6">
        <input
          type="password"
          id="newPw"
          v-model="newPw"
          placeholder="새 비밀번호를 입력해주세요"
          required
          class="input-box" />
      </div>
      <div class="mb-8">
        <input
          type="password"
          id="checkPw"
          v-model="checkPw"
          placeholder="새 비밀번호를 다시 입력해주세요"
          required
          class="input-box" />
      </div>
      <button
        type="submit"
        class="button-large-primary">
        비밀번호 재설정
      </button>
    </form>
    <div class="flex w-full justify-center"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../components/ModalView.vue'
import { patchPassword } from '@/api/auth'
import TitleContainer from '@/components/common/TitleContainer.vue'

const newPw = ref('')
const checkPw = ref('')
const isModalOpen = ref(false)
const router = useRouter()

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleChange = () => {
  if (newPw.value === checkPw.value) {
    const response = patchPassword(newPw.value)
    console.log(response)
    console.log('비밀번호 변경 성공!')
    toggleModal()
  } else {
    alert('비밀번호가 일치하지 않습니다.')
  }
}

const pwChange = () => {
  router.push('/login')
}
</script>
