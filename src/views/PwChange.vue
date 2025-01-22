<template>
  <div class="max-w-md mx-auto p-10">
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
      <div class="mb-3">
        <input
          type="password"
          id="newPw"
          v-model="newPw"
          placeholder="새 비밀번호를 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div class="mt-3 mb-8">
        <input
          type="password"
          id="checkPw"
          v-model="checkPw"
          placeholder="새 비밀번호를 다시 입력해주세요"
          required
          class="block w-full px-4 py-4 border border-zinc-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <button
        type="submit"
        class="w-full py-4 px-4 bg-primary1 text-white rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500">
        비밀번호 재설정
      </button>
    </form>
    <div class="flex w-full justify-center"></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'PwChangePage',
  setup() {
    const newPw = ref('')
    const checkPw = ref('')

    const handleChange: () => void = () => {
      if (newPw.value === checkPw.value) {
        alert('비밀번호 변경 성공')
      } else {
        alert('일치x')
      }
    }

    return {
      newPw,
      checkPw,
      handleChange
    }
  }
}
</script>
