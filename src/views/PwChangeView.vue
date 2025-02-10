<template>
  <div class="max-w-400">
    <ModalView
      :isOpen="isModalOpen"
      type="successType"
      @close="closeModal">
      <template #header> 비밀번호가 변경 되었습니다 </template>
      <template #body> 다시 로그인 해주세요 </template>
    </ModalView>
    <div class="py-16">
      <TitleContainer
        v-if="!isFirst"
        :title="'비밀번호\n재설정'"
        content="새로운 비밀번호를 입력해주세요" />
      <TitleContainer
        v-if="isFirst"
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
          ref="passwordInput"
          :class="[
            'block w-full px-4 py-4 border rounded focus:outline-none',
            isInvalid ? 'border-red-1' : 'border-border-1'
          ]" />
        <p
          v-show="isInvalid"
          class="text-red-1 text-xs font-bold mt-1">
          대문자, 소문자, 숫자, 특수문자 포함 8자-20자 입력해주세요
        </p>
      </div>
      <div class="mb-8">
        <input
          type="password"
          id="checkPw"
          v-model="checkPw"
          ref="checkPwInput"
          placeholder="새 비밀번호를 다시 입력해주세요"
          required
          :class="[
            'block w-full px-4 py-4 border rounded focus:outline-none',
            isDifferent ? 'border-red-1' : 'border-border-1'
          ]" />
        <p
          v-show="isDifferent"
          class="text-red-1 text-xs font-bold mt-1">
          비밀번호가 일치하지 않아요
        </p>
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
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { deleteLogout, patchPassword } from '@/api/auth'
import TitleContainer from '@/components/common/TitleContainer.vue'
import Cookies from 'js-cookie'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import ModalView from '@/components/common/ModalView.vue'
const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)

const isFirst = Cookies.get('accessToken') ? (Cookies.get('refreshToken') ? false : true) : false
const newPw = ref('')
const checkPw = ref('')
const isModalOpen = ref(false)
const router = useRouter()
const isDifferent = ref(false)
const checkPwInput = ref<HTMLInputElement | null>(null)
const isInvalid = ref(false)
const passwordInput = ref<HTMLInputElement | null>(null)

const validatePassword = () => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-]).{8,20}$/
  isInvalid.value = !regex.test(newPw.value)

  if (isInvalid.value) {
    nextTick(() => {
      passwordInput.value?.focus()
    })
  }
}

const openModal = () => {
  isModalOpen.value = !isModalOpen.value
}
const closeModal = () => {
  isModalOpen.value = !isModalOpen.value
  router.push('/login')
  deleteLogout()
}

const handleChange = () => {
  validatePassword()
  if (isInvalid.value == false && newPw.value === checkPw.value) {
    patchPassword(newPw.value)
    pwChange()
    openModal()
  } else {
    isDifferent.value = true
    checkPwInput.value?.focus()
  }
}

const pwChange = () => {
  isLogined.value = false
}
</script>
