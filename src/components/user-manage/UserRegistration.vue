<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>새로운 회원이 추가되었습니다</template>
    </ModalView>
    <RequestTaskInput
      v-model="userRegistrationForm.name"
      :placeholderText="'회원의 이름을 입력해주세요'"
      :labelName="'이름'" />
    <RequestTaskInput
      v-model="userRegistrationForm.nickname"
      :is-invalidate="isInvalidate"
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
        :placeholderText="'@kakao.com'"
        :label-name="'도메인'"
        :is-not-required="false" />
    </div>
    <DepartmentDropDown
      v-model="userRegistrationForm.departmentId"
      :is-invalidate="isInvalidate" />
    <RequestTaskDropdown
      v-model="userRegistrationForm.role"
      :options="RoleKeys"
      :label-name="'역할'"
      :is-invalidate="isInvalidate"
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
  </div>
</template>

<script lang="ts" setup>
import { addMemberAdmin } from '@/api/admin'
import { INITIAL_USER_REGISTRATION, RoleKeys, RoleTypeMapping } from '@/constants/admin'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import FormCheckbox from '../common/FormCheckbox.vue'
import ModalView from '../common/ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'
import DepartmentDropDown from './DepartmentDropDown.vue'

const router = useRouter()
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

const handleSubmit = async () => {
  try {
    const formData = {
      ...userRegistrationForm.value,
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
</script>
