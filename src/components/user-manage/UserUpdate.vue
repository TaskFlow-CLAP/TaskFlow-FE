<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>회원정보가 수정되었습니다</template>
    </ModalView>
    <RequestTaskInput
      v-model="userRegistrationForm.name"
      :placeholderText="'회원의 이름을 입력해주세요'"
      :labelName="'이름'" />
    <RequestTaskInput
      v-model="userRegistrationForm.nickname"
      :placeholderText="'회원의 아이디를 입력해주세요'"
      :isEdit="true"
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
        :is-edit="true"
        :is-not-required="false" />
    </div>
    <RequestTaskDropdown
      v-model="userRegistrationForm.role"
      :options="RoleKeys"
      :label-name="'역할'"
      :placeholderText="'회원의 역할을 선택해주세요'" />
    <FormCheckbox
      v-if="isManager"
      v-model="userRegistrationForm.isReviewer"
      :labelName="'요청 승인 권한'"
      :checkButtonName="'허용'"
      :isDisabled="!isManager"
      :isChecked="userRegistrationForm.isReviewer" />
    <DepartmentDropDown v-model="userRegistrationForm.departmentId" />
    <RequestTaskInput
      v-model="userRegistrationForm.departmentRole"
      :placeholderText="'회원의 직무를 입력해주세요'"
      :is-not-required="true"
      :labelName="'직무'" />
    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="수정" />
  </div>
</template>

<script lang="ts" setup>
import { getMemberDetailAdmin, updateMemberAdmin } from '@/api/admin'
import {
  INITIAL_USER_REGISTRATION,
  RoleKeys,
  RoleMapping,
  RoleTypeMapping
} from '@/constants/admin'
import type { UserRegistrationProps } from '@/types/admin'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import FormCheckbox from '../common/FormCheckbox.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'
import DepartmentDropDown from './DepartmentDropDown.vue'
import ModalView from '../common/ModalView.vue'

const route = useRoute()
const router = useRouter()

const userRegistrationForm = ref(INITIAL_USER_REGISTRATION)
const isManager = computed(() => userRegistrationForm.value.role === '담당자')
const userId = ref(route.query.id)
const userData = ref<UserRegistrationProps | null>(null)
const isModalVisible = ref(false)

watch(
  () => router.currentRoute.value.query.id,
  newId => {
    userId.value = newId
  }
)

onMounted(async () => {
  if (typeof userId.value === 'string') {
    userData.value = await getMemberDetailAdmin(userId.value)
  }
  if (userData.value && userData.value.role in RoleMapping) {
    userRegistrationForm.value = {
      ...userData.value,
      email: '@' + userData.value.email.split('@')[1],
      role: RoleMapping[userData.value.role as keyof typeof RoleMapping]
    }
  }
})

const handleCancel = async () => {
  userRegistrationForm.value = { ...INITIAL_USER_REGISTRATION }
  isModalVisible.value = false
  router.back()
}

const handleSubmit = async () => {
  if (typeof userId.value === 'string') {
    const userData = {
      role: RoleTypeMapping[userRegistrationForm.value.role],
      name: userRegistrationForm.value.name,
      isReviewer: isManager.value ? userRegistrationForm.value.isReviewer : false,
      departmentId: userRegistrationForm.value.departmentId,
      departmentRole: userRegistrationForm.value.departmentRole
    }
    await updateMemberAdmin(userId.value, userData)
    isModalVisible.value = true
  }
}
</script>
