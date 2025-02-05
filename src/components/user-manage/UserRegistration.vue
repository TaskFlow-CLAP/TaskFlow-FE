<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header> 새로운 회원이 추가되었습니다 </template>
    </ModalView>
    <RequestTaskInput
      v-model="userRegistrationForm.name"
      :placeholderText="'회원의 이름을 입력해주세요'"
      :labelName="'이름'" />
    <RequestTaskInput
      v-model="userRegistrationForm.nickname"
      :placeholderText="'회원의 아이디를 입력해주세요'"
      :labelName="'아이디'" />
    <RequestTaskInput
      v-model="userRegistrationForm.email"
      :placeholderText="'회원의 이메일을 입력해주세요'"
      :labelName="'이메일'" />
    <RequestTaskDropdown
      v-model="userRegistrationForm.role"
      :options="RoleKeys"
      :label-name="'역할'"
      :placeholderText="'회원의 역할을 선택해주세요'" />
    <FormCheckbox
      v-model="userRegistrationForm.isReviewer"
      :labelName="'요청 승인 권한'"
      :checkButtonName="'허용'"
      :isChecked="userRegistrationForm.isReviewer" />
    <RequestTaskInput
      v-model="userRegistrationForm.departmentId"
      :placeholderText="'회원의 부서를 입력해주세요'"
      :is-not-required="true"
      :labelName="'부서'" />
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
import { INITIAL_USER_REGISTRATION, RoleKeys } from '@/constants/admin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import FormCheckbox from '../common/FormCheckbox.vue'
import ModalView from '../ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'

const isModalVisible = ref(false)
const userRegistrationForm = ref(INITIAL_USER_REGISTRATION)

const router = useRouter()

const handleCancel = () => {
  userRegistrationForm.value = { ...INITIAL_USER_REGISTRATION }
  isModalVisible.value = false
  router.back()
}

const handleSubmit = async () => {
  console.log(userRegistrationForm.value)
  const formData = { ...userRegistrationForm.value, role: 'ROLE_USER' }
  await addMemberAdmin(formData)
  isModalVisible.value = true
}
</script>
