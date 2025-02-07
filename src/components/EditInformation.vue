<template>
  <div class="flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header> 정보가 수정되었습니다 </template>
    </ModalView>

    <ModalView
      :isOpen="isWarnningModalVisible"
      :type="'warningType'"
      @click="changePw"
      @close="warningModalToggle">
      <template #header> 정보가 저장되지 않았습니다 </template>
      <template #body> 수정 사항을 삭제하고 이동하시겠습니까? </template>
    </ModalView>

    <div class="profile">
      <p class="text-body text-xs font-bold">프로필 사진</p>
      <img
        v-if="previewUrl || info.profileImageUrl"
        :src="previewUrl || info.profileImageUrl"
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
        v-model="name" />
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
          v-model="agitCheck"
          :checkButtonName="'아지트'"
          :isChecked="agitCheck" />
        <FormCheckbox
          v-model="kakaoWorkCheck"
          :checkButtonName="'카카오워크'"
          :isChecked="kakaoWorkCheck" />
        <FormCheckbox
          v-model="emailCheck"
          :checkButtonName="'이메일'"
          :isChecked="emailCheck" />
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
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from './ModalView.vue'
import FormButtonContainer from './common/FormButtonContainer.vue'
import FormCheckbox from './common/FormCheckbox.vue'
const router = useRouter()
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { patchEditInfo } from '@/api/common'

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const name = ref(info.value.name)
const agitCheck = ref(info.value.notificationSettingInfo.agit)
const emailCheck = ref(info.value.notificationSettingInfo.email)
const kakaoWorkCheck = ref(info.value.notificationSettingInfo.kakaoWork)

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)

const isModalVisible = ref(false)
const isWarnningModalVisible = ref(false)

watchEffect(() => {
  if (info.value) {
    name.value = info.value.name
    agitCheck.value = info.value.notificationSettingInfo.agit
    emailCheck.value = info.value.notificationSettingInfo.email
    kakaoWorkCheck.value = info.value.notificationSettingInfo.kakaoWork
  }
})

const handleCancel = () => {
  router.back()
}

const handlePwChange = () => {
  if (
    selectedFile.value ||
    info.value.name != name.value ||
    info.value.notificationSettingInfo.agit != agitCheck.value ||
    info.value.notificationSettingInfo.kakaoWork != kakaoWorkCheck.value ||
    info.value.notificationSettingInfo.email != emailCheck.value
  ) {
    warningModalToggle()
  } else {
    changePw()
  }
}

const changePw = () => {
  router.push('/pw-check')
}

const warningModalToggle = () => {
  isWarnningModalVisible.value = !isWarnningModalVisible.value
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    previewUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

const handleSubmit = async () => {
  const formData = new FormData()
  const memberInfo = {
    name: name.value,
    agitNotification: agitCheck.value,
    emailNotification: emailCheck.value,
    kakaoWorkNotification: kakaoWorkCheck.value
  }
  const jsonMemberInfo = JSON.stringify(memberInfo)
  const newBlob = new Blob([jsonMemberInfo], { type: 'application/json' })

  formData.append('memberInfo', newBlob)

  if (selectedFile.value) {
    formData.append('profileImage', selectedFile.value)
  }

  try {
    await patchEditInfo(formData)
    isModalVisible.value = true
    await memberStore.updateMemberInfoWithToken()
  } catch (error) {
    console.error('요청 실패:', error)
  }
}
</script>
