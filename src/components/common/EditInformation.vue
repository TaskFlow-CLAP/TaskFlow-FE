<template>
  <div class="flex flex-col gap-y-6">
    <ModalView
      :isOpen="isSuccessModalVisible"
      :type="'successType'"
      @close="isSuccessModalVisible = !isSuccessModalVisible">
      <template #header>정보가 수정되었습니다</template>
    </ModalView>

    <ModalView
      :isOpen="isWarnningModalVisible"
      :type="'warningType'"
      @click="modalTarget === 'pw' ? changePw() : router.back()"
      @close="warningModalToggle">
      <template #header>정보가 저장되지 않았습니다</template>
      <template #body>수정 사항을 삭제하고 이동하시겠습니까?</template>
    </ModalView>

    <ModalView
      :isOpen="isModalVisible"
      :type="modalType"
      @click="modalToggle"
      @close="modalToggle">
      <template #header>{{ modalHeader }}</template>
      <template #body>{{ modalBody }}</template>
    </ModalView>

    <div class="profile">
      <p class="text-body text-xs font-semibold">프로필 사진</p>
      <ImageContainer
        class="mt-3"
        :url="previewUrl || info.profileImageUrl"
        :size="96" />
      <div class="flex gap-6">
        <label
          for="fileInput"
          class="mt-3 text-xs text-primary3 font-semibold cursor-pointer hover:underline"
          >변경</label
        >
        <label
          for="fileDelete"
          class="mt-3 text-xs text-red-1 font-semibold cursor-pointer hover:underline"
          >삭제</label
        >
      </div>
      <input
        id="fileInput"
        type="file"
        @change="handleFileUpload"
        accept="image/*"
        class="hidden" />
      <button
        id="fileDelete"
        type="button"
        @click="handleFileDelete"
        class="hidden" />
    </div>
    <div class="flex flex-col relative">
      <div class="flex items-center gap-1 text-red-1">
        <p class="text-body text-xs font-semibold">이름</p>
        <p>*</p>
        <span
          v-show="isInvalid || isFull"
          class="text-xs font-semibold"
          >{{ nameError }}</span
        >
      </div>
      <input
        :class="[
          'block w-full px-4 py-4 border rounded focus:outline-none h-11 mt-2',
          isInvalid || isFull ? 'border-red-1' : 'border-border-1'
        ]"
        placeholder="이름을 입력해주세요"
        v-model="name"
        maxlength="10"
        ref="nameInput"
        @blur="validateName" />
      <span class="absolute text-xs top-[calc(100%+4px)] w-full flex justify-end text-body">
        {{ name.length }} / 10
      </span>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-semibold">아이디</p>
      <p class="mt-2">{{ info.nickname }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-semibold">이메일</p>
      <p class="mt-2">{{ info.email }}</p>
    </div>
    <div class="flex flex-col">
      <p class="text-body text-xs font-semibold">부서</p>
      <p class="mt-2">{{ info.departmentName }}</p>
    </div>
    <div
      v-if="info.departmentRole"
      class="flex flex-col">
      <p class="text-body text-xs font-semibold">직무</p>
      <p class="mt-2">{{ info.departmentRole }}</p>
    </div>
    <div>
      <p class="text-body text-xs font-semibold">알림 수신 여부</p>
      <div class="flex flex-col mt-2 gap-2">
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
      <p class="text-body text-xs font-semibold">비밀번호 재설정</p>
      <button
        type="button"
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
import { patchEditInfo } from '@/api/common'
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_FILE_EXTENSIONS_IMAGE } from '@/constants/common'
import { useMemberStore } from '@/stores/member'
import DOMPurify from 'dompurify'
import { storeToRefs } from 'pinia'
import { nextTick, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from './FormButtonContainer.vue'
import FormCheckbox from './FormCheckbox.vue'
import ImageContainer from './ImageContainer.vue'
import ModalView from './ModalView.vue'

const router = useRouter()

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const name = ref(info.value.name)
const emailCheck = ref(info.value.notificationSettingInfo.email)
const kakaoWorkCheck = ref(info.value.notificationSettingInfo.kakaoWork)
const imageDelete = ref(info.value.profileImageUrl == null ? true : false)

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)

const isInvalid = ref(false)
const isFull = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)

const isSuccessModalVisible = ref(false)
const isWarnningModalVisible = ref(false)
const isModalVisible = ref(false)

const modalType = ref('')

const modalHeader = ref('')
const modalBody = ref('')

const nameError = ref('')

watchEffect(() => {
  if (info.value) {
    name.value = info.value.name
    emailCheck.value = info.value.notificationSettingInfo.email
    kakaoWorkCheck.value = info.value.notificationSettingInfo.kakaoWork
  }
})

const validateName = () => {
  const regex = /[!@#$%^&*(),.?":{}|<>\p{Emoji}]/gu
  isInvalid.value = regex.test(name.value)
  if (isInvalid.value == true) {
    nameError.value = '이름에는 특수문자가 포함될 수 없습니다'
  }
  if (name.value.length > 10 || name.value.length < 1) {
    isFull.value = true
    nameError.value = '이름은 1글자 이상, 10글자이하만 가능합니다'
  } else {
    isFull.value = false
  }

  if (isInvalid.value || isFull.value) {
    nextTick(() => {
      nameInput.value?.focus()
    })
  }
}

const checkChange = () => {
  if (
    imageDelete.value ||
    selectedFile.value ||
    info.value.name != name.value ||
    info.value.notificationSettingInfo.kakaoWork != kakaoWorkCheck.value ||
    info.value.notificationSettingInfo.email != emailCheck.value
  ) {
    return true
  } else {
    return false
  }
}

const modalTarget = ref('')
const handleCancel = () => {
  if (checkChange()) {
    modalTarget.value = 'cancel'
    warningModalToggle()
  } else {
    router.back()
  }
}

const handlePwChange = () => {
  if (checkChange()) {
    modalTarget.value = 'pw'
    warningModalToggle()
  } else {
    changePw()
  }
}

const changePw = () => {
  router.replace('/pw-change')
}

const warningModalToggle = () => {
  isWarnningModalVisible.value = !isWarnningModalVisible.value
}

const modalToggle = () => {
  isModalVisible.value = !isModalVisible.value
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]

    const fileName = file.name.toLowerCase()
    const fileExtension = fileName.split('.').pop()

    if (!fileExtension || !ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
      modalHeader.value = '지원하지 않는 파일입니다'
      modalBody.value = 'jpg, jpeg, png, gif, bmp 파일만 업로드 가능합니다'
      modalType.value = 'failType'
      modalToggle()
      return
    }
    if (!ALLOWED_FILE_EXTENSIONS_IMAGE.includes(file.type)) {
      modalHeader.value = '파일 타입을 확인해주세요'
      modalBody.value = '파일 타입과 확장자명이 일치해야합니다'
      modalType.value = 'failType'
      modalToggle()
      return
    }

    const newFiles = Array.from(target.files).filter(file => file.size <= 5 * 1024 * 1024)
    if (newFiles.length !== target.files.length) {
      modalHeader.value = '이미지 용량을 확인해주세요'
      modalBody.value = '이미지 용량은 5mb까지 가능합니다'
      modalType.value = 'failType'
      modalToggle()
      return
    }

    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    imageDelete.value = false
  }
}

const handleFileDelete = () => {
  imageDelete.value = true
  previewUrl.value = ''
  info.value.profileImageUrl = ''
}

const handleSubmit = async () => {
  if (isInvalid.value == false && isFull.value == false) {
    modalHeader.value = '정보 수정 중 입니다...'
    modalBody.value = '잠시만 기다려주세요'
    modalType.value = 'loadingType'
    isModalVisible.value = true

    const formData = new FormData()
    const memberInfo = {
      name: DOMPurify.sanitize(name.value),
      isProfileImageDeleted: imageDelete.value,
      emailNotification: emailCheck.value,
      kakaoWorkNotification: kakaoWorkCheck.value
    }
    const jsonMemberInfo = JSON.stringify(memberInfo)
    const newBlob = new Blob([jsonMemberInfo], { type: 'application/json' })

    formData.append('memberInfo', newBlob)

    if (selectedFile.value && imageDelete.value == false) {
      formData.append('profileImage', selectedFile.value)
    } else if (imageDelete.value == true) {
      selectedFile.value = null
    }

    try {
      await patchEditInfo(formData)
      selectedFile.value = null
      imageDelete.value = false
      isModalVisible.value = false
      isSuccessModalVisible.value = true
      await memberStore.updateMemberInfoWithToken()
    } catch {
      isModalVisible.value = false
    }
  }
}
</script>
