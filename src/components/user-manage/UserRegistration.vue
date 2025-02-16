<template>
  <div class="w-full flex flex-col gap-y-6">
    <div class="relative">
      <RequestTaskInput
        v-model="userRegistrationForm.name"
        :is-invalidate="isInvalidate === 'nameEmpty' ? 'empty' : ''"
        :placeholderText="'회원의 이름을 입력해주세요'"
        :limit-length="10"
        :labelName="'이름'" />
    </div>
    <RequestTaskInput
      v-model="userRegistrationForm.nickname"
      :is-invalidate="
        isInvalidate === 'nicknameEmpty'
          ? 'empty'
          : isInvalidate === 'wrongNickname'
            ? isInvalidate
            : ''
      "
      :placeholderText="'회원의 아이디를 입력해주세요'"
      :labelName="'아이디'" />
    <div class="flex w-full gap-2">
      <RequestTaskInput
        v-model="userRegistrationForm.nickname"
        :is-edit="true"
        :placeholderText="'이메일은 아이디와 동일합니다'"
        :labelName="'이메일'" />
      <RequestTaskInput
        v-model="userRegistrationForm.email"
        :placeholderText="'@kakaocorp.com'"
        :label-name="'도메인'"
        :is-invalidate="isInvalidate === 'wrongEmail' ? isInvalidate : ''"
        :is-not-required="false" />
    </div>
    <DepartmentDropDown
      v-model="userRegistrationForm.department"
      :is-invalidate="isInvalidate === 'departmentEmpty' ? isInvalidate : ''" />
    <RequestTaskDropdown
      v-model="userRegistrationForm.role"
      :options="filteredRoleKeys"
      :label-name="'역할'"
      :placeholderText="'회원의 역할을 선택해주세요'" />
    <FormCheckbox
      v-if="isManager"
      v-model="userRegistrationForm.isReviewer"
      :labelName="'요청 승인 권한'"
      :checkButtonName="'허용'"
      :isDisabled="!isManager"
      :isChecked="userRegistrationForm.isReviewer" />
    <RequestTaskInput
      v-model="userRegistrationForm.departmentRole"
      :placeholderText="'회원의 직무를 입력해주세요'"
      :is-not-required="true"
      :labelName="'직무'" />
    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="추가" />
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>새로운 회원이 추가되었습니다</template>
    </ModalView>
  </div>
</template>

<script lang="ts" setup>
import { addMemberAdmin } from '@/api/admin'
import { INITIAL_USER_REGISTRATION, RoleKeys, RoleTypeMapping } from '@/constants/admin'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import FormCheckbox from '../common/FormCheckbox.vue'
import ModalView from '../common/ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'
import DepartmentDropDown from './DepartmentDropDown.vue'
import DOMPurify from 'dompurify'

const router = useRouter()

const usernameRegex = /^[a-z]{3,10}\.[a-z]{1,5}$/
const emailRegex = /^@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

const isModalVisible = ref(false)
const userRegistrationForm = ref(INITIAL_USER_REGISTRATION)
const isInvalidate = ref('')
const isError = ref(false)
const isManager = computed(() => userRegistrationForm.value.role === '담당자')

onMounted(async () => {
  userRegistrationForm.value = { ...INITIAL_USER_REGISTRATION }
})

const handleCancel = () => {
  isModalVisible.value = false
  router.back()
}

const filteredRoleKeys = computed(() => {
  if (userRegistrationForm.value.department?.isManager) {
    return RoleKeys
  }
  return RoleKeys.filter(role => role !== '담당자')
})

watch(
  () => userRegistrationForm.value.department?.isManager,
  newValue => {
    if (!newValue && userRegistrationForm.value.role === '담당자') {
      userRegistrationForm.value.role = '사용자'
    }
  }
)

const handleSubmit = async () => {
  try {
    if (!userRegistrationForm.value.name) {
      isInvalidate.value = 'nameEmpty'
      return
    }
    if (!userRegistrationForm.value.nickname) {
      isInvalidate.value = 'nicknameEmpty'
      return
    }
    if (!usernameRegex.test(userRegistrationForm.value.nickname)) {
      isInvalidate.value = 'wrongNickname'
      return
    }
    if (!emailRegex.test(userRegistrationForm.value.email)) {
      isInvalidate.value = 'wrongEmail'
      return
    }
    if (!userRegistrationForm.value.department?.departmentId) {
      isInvalidate.value = 'departmentEmpty'
      return
    }

    userRegistrationForm.value.name = DOMPurify.sanitize(userRegistrationForm.value.name)
    userRegistrationForm.value.nickname = DOMPurify.sanitize(userRegistrationForm.value.nickname)
    userRegistrationForm.value.email = DOMPurify.sanitize(userRegistrationForm.value.email)
    userRegistrationForm.value.departmentRole = DOMPurify.sanitize(
      userRegistrationForm.value.departmentRole
    )

    const { department, ...restForm } = userRegistrationForm.value
    const formData = {
      ...restForm,
      departmentId: department?.departmentId,
      isReviewer: isManager.value ? userRegistrationForm.value.isReviewer : false,
      role: RoleTypeMapping[userRegistrationForm.value.role],
      email: userRegistrationForm.value.nickname + userRegistrationForm.value.email
    }

    await addMemberAdmin(formData)
    isModalVisible.value = true
  } catch (error) {
    if (error instanceof Error && error.message === 'MEMBER_DUPLICATED') {
      isInvalidate.value = 'duplicate'
    } else if (error instanceof Error && error.message === 'MEMBER_REVIEWER') {
      isInvalidate.value = 'reviewer'
    } else {
      isError.value = true
    }
  }
}

watch(isManager, () => {
  userRegistrationForm.value.isReviewer = false
})
</script>
