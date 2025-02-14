<template>
  <div class="max-w-400">
    <div class="py-16">
      <ModalView
        :is-open="isErrorVisible"
        type="failType"
        @close="closeError">
        <template #header>{{ messageHeader }}</template>
        <template #body>{{ messageBody }}</template>
      </ModalView>
      <ModalView
        :isOpen="isModalVisible"
        type="successType"
        @close="closeModal">
        <template #header>비밀번호가 변경 되었습니다</template>
      </ModalView>
      <TitleContainer
        v-if="!isConfirmed"
        :title="'비밀번호\n재설정'"
        :content="'비밀번호 재설정을 위해\n현재 비밀번호를 입력해주세요'" />
      <TitleContainer
        v-else
        :title="'비밀번호\n재설정'"
        content="새로운 비밀번호를 입력해주세요" />
    </div>
    <form
      v-if="!isConfirmed"
      @submit.prevent="handleCheck"
      class="flex flex-col gap-8">
      <input
        type="password"
        id="pw"
        v-model="pw"
        placeholder="비밀번호를 입력해주세요"
        required
        class="input-box"
        autocomplete="current-password" />
      <div class="flex flex-col gap-2">
        <button
          type="submit"
          class="button-large-primary">
          확인
        </button>
        <button
          type="button"
          class="flex justify-center text-xs font-semibold text-body hover:underline"
          @click="router.replace('/edit-information')">
          이전으로
        </button>
      </div>
    </form>
    <form
      v-else
      @submit.prevent="handleChange"
      class="flex flex-col gap-8">
      <div class="relative">
        <input
          type="password"
          id="newPw"
          v-model="newPw"
          placeholder="새 비밀번호를 입력해주세요"
          required
          ref="passwordInput"
          autocomplete="new-password"
          :class="[
            'block w-full px-4 py-4 border rounded focus:outline-none',
            isInvalid ? 'border-red-1' : 'border-border-1'
          ]" />
        <p
          v-show="isInvalid"
          class="absolute text-red-1 text-xs font-semibold mt-1">
          대문자, 소문자, 숫자, 특수문자 포함 8자-20자 입력해주세요
        </p>
      </div>
      <div class="relative">
        <input
          type="password"
          id="checkPw"
          v-model="checkPw"
          ref="checkPwInput"
          placeholder="새 비밀번호를 다시 입력해주세요"
          required
          autocomplete="new-password"
          :class="[
            'block w-full px-4 py-4 border rounded focus:outline-none',
            isDifferent ? 'border-red-1' : 'border-border-1'
          ]" />
        <p
          v-show="isDifferent"
          class="absolute text-red-1 text-xs font-semibold mt-1">
          비밀번호가 일치하지 않아요
        </p>
      </div>
      <div class="flex flex-col gap-2 items-center">
        <button
          type="submit"
          class="button-large-primary">
          비밀번호 재설정
        </button>
        <button
          type="button"
          class="flex justify-center text-xs font-semibold text-body hover:underline"
          @click="goBack">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { patchPassword, postPasswordCheck } from '@/api/auth'
import TitleContainer from '@/components/common/TitleContainer.vue'
import { nextTick, onMounted, ref } from 'vue'
import ModalView from '@/components/common/ModalView.vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const isErrorVisible = ref(false)

const messageHeader = ref('')
const messageBody = ref('')

const pw = ref('')
const isConfirmed = ref(false)

const handleCheck = async () => {
  await postPasswordCheck(pw.value)
  isConfirmed.value = true
}

const newPw = ref('')
const checkPw = ref('')
const isDifferent = ref(false)
const checkPwInput = ref<HTMLInputElement | null>(null)
const isInvalid = ref(false)
const passwordInput = ref<HTMLInputElement | null>(null)
const isModalVisible = ref(false)
const router = useRouter()

onMounted(() => {
  const refreshToken = Cookies.get('refreshToken')
  if (!refreshToken) {
    isConfirmed.value = true
  }
})

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
  isModalVisible.value = !isModalVisible.value
}

const handleChange = async () => {
  if (newPw.value != checkPw.value) {
    isDifferent.value = true
    checkPwInput.value?.focus()
  } else if (newPw.value == checkPw.value) {
    isDifferent.value = false
  }
  validatePassword()
  if (isInvalid.value == false && newPw.value === checkPw.value) {
    await patchPassword(newPw.value)
    openModal()
  }
}

const closeModal = () => {
  isModalVisible.value = !isModalVisible.value
  if (Cookies.get('refreshToken')) {
    router.replace('/edit-information')
  } else {
    Cookies.remove('accessToken')
    router.replace('/login')
  }
}
const closeError = () => {
  isErrorVisible.value = !isErrorVisible.value
}

const goBack = () => {
  if (Cookies.get('refreshToken')) {
    router.replace('/edit-information')
  } else {
    Cookies.remove('accessToken')
    router.replace('/login')
  }
}
</script>
