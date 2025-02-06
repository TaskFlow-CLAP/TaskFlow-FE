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
        v-if="previewUrl || info.imageUrl"
        :src="previewUrl || info.imageUrl"
        alt="프로필 이미지"
        class="w-24 h-24 rounded-full object-cover border mt-3" />

      <label
        for="fileInput"
        class="mt-3 text-xs text-primary1 font-bold cursor-pointer"
        >변경</label
      >
      <input
        id="fileInput"
        type="file"
        @change="handleFileUpload"
        accept="image/*"
        class="hidden" />
    </div>

    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">이름</p>
      <input
        class="input-box h-11 mt-2 text-black"
        placeholder="이름을 입력해주세요"
        v-model="info.memberName" />
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">아이디</p>
      <p class="mt-2 text-black">{{ info.nickname }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">이메일</p>
      <p class="mt-2 text-black">{{ info.email }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">부서</p>
      <p class="mt-2 text-black">{{ info.departmentName }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-bold">직무</p>
      <p class="mt-2 text-black">{{ info.departmentRole }}</p>
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
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { patchEditInfo } from '@/api/user'
import

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)

const isModalVisible = ref(false)

const memberForm = ref({
  isAgitChecked: false,
  isKakaoWorkChecked: false,
  isEmailChecked: false
})

const formData = new FormData()

const requestData: any = {
  name: info.value.memberName,
  agitNotification: memberForm.value.isAgitChecked,
  emailNotification: memberForm.value.isEmailChecked,
  kakaoWorkNotification: memberForm.value.isKakaoWorkChecked
}
const handleCancel = () => {
  router.back()
}

const handlePwChange = () => {
  router.push('/pw-check')
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]

    previewUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

const handleSubmit = () => {
  isModalVisible.value = true
  console.log(requestData)
  patchEditInfo(requestData, selectedFile.value)
}
</script>
