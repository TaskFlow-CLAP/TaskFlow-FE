<template>
  <div class="max-w-md mx-auto p-10">
    <Modal
      :isOpen="isModalOpen"
      :type="'checkType'"
      @close="pwChange">
      <template #header> 비밀번호가 변경 되었습니다 </template>
      <template #body> 다시 로그인 해주세요 </template>
    </Modal>
    <div class="py-16">
      <div class="text-4xl font-bold text-center">
        <p class="pb-2">비밀번호</p>
        <p class="pb-2">재설정</p>
      </div>
      <p class="text-center font-bold text-body">초기 비밀번호를 변경해주세요</p>
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
          class="block w-full px-4 py-4 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div class="mb-8">
        <input
          type="password"
          id="checkPw"
          v-model="checkPw"
          placeholder="새 비밀번호를 다시 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <CustomButton
        color="primaryButton"
        type="submit"
        name="비밀번호 재설정"
        click="handleChange" />
    </form>
    <div class="flex w-full justify-center"></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import router from '../router/index'
import Modal from '../components/Modal.vue'

export default {
  name: 'PwChangePage',
  components: Modal,
  setup() {
    const newPw = ref('')
    const checkPw = ref('')
    const isModalOpen = ref(false)

    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value
    }

    const handleChange: () => void = () => {
      if (newPw.value === checkPw.value) {
        console.log('asdf')
        toggleModal()
        //비밀번호 재설정 API 추가 필요
      } else {
        alert('일치x')
      }
    }

    const pwChange = () => {
      router.push('/login')
    }

    return {
      newPw,
      checkPw,
      handleChange,
      isModalOpen,
      toggleModal,
      pwChange
    }
  }
}
</script>
