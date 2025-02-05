<template>
  <div class="flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header> 정보가 수정되었습니다 </template>
    </ModalView>

    <div class="profile">
      <p class="text-body text-xs font-bold">프로필 사진</p>
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="프로필 이미지"
        class="w-24 h-24 rounded-full object-cover border mt-3" />
      <div
        v-else
        class="w-24 h-24 rounded-full bg-background-1 flex items-center justify-center mt-3"></div>
      <!-- 파일 업로드 필요 -->
      <p class="mt-3 text-xs text-primary1 font-bold cursor-pointer">변경</p>
    </div>

    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">이름</p>
      <input
        class="input-box h-11 mt-2 text-black"
        placeholder="이름을 입력해주세요"
        v-model="memberName" />
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">아이디</p>
      <p class="mt-2 text-black">{{ memberId }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">이메일</p>
      <p class="mt-2 text-black">{{ memberEmail }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">부서</p>
      <p class="mt-2 text-black">{{ memberDepartment }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">직무</p>
      <p class="mt-2 text-black">{{ memberJob }}</p>
    </div>
    <div>
      <p class="text-body text-xs font-bold">알림 수신 여부</p>
      <div class="flex flex-col mt-2 gap-2">
        <FormCheckbox
          v-model="memberForm.isAgitChecked"
          :checkButtonName="'아지트'"
          :isChecked="memberForm.isAgitChecked" />
        <FormCheckbox
          v-model="memberForm.isKakaoWorkChecked"
          :checkButtonName="'카카오워크'"
          :isChecked="memberForm.isKakaoWorkChecked" />
        <FormCheckbox
          v-model="memberForm.isEmailChecked"
          :checkButtonName="'이메일'"
          :isChecked="memberForm.isEmailChecked" />
      </div>
    </div>
    <div>
      <p class="text-body text-xs font-bold">비밀번호 재설정</p>
      <button
        class="button-medium-secondary mt-2"
        @click="handlePwChange">
        재설정하기
      </button>
    </div>

    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="수정" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from './ModalView.vue'
import FormButtonContainer from './common/FormButtonContainer.vue'
import FormCheckbox from './common/FormCheckbox.vue'
const router = useRouter()

const memberName = ref('백지연')
const memberId = ref('Chole.yeon')
const memberEmail = ref('taskflow123@gachon.ac.kr')
const memberDepartment = ref('인프라팀')
const memberJob = ref('인프라 아키텍처')
const imageUrl = ref('')
const isModalVisible = ref(false)

const memberForm = ref({
  isAgitChecked: false,
  isKakaoWorkChecked: false,
  isEmailChecked: false
})

const handleCancel = () => {
  router.back()
}

const handleSubmit = () => {
  isModalVisible.value = true
}

const handlePwChange = () => {
  router.push('/pw-check')
}
</script>
