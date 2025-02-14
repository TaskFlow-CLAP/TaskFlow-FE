<template>
  <div class="w-full flex flex-col gap-y-6">
    <div class="relative">
      <RequestTaskInput
        v-model="userRegistrationForm.name"
        :is-invalidate="isInvalidate"
        :placeholderText="'회원의 이름을 입력해주세요'"
        :labelName="'이름'" />
      <p class="absolute text-xs top-[calc(100%+4px)] w-full flex justify-end text-body">
        {{ userRegistrationForm.name.length }}/10
      </p>
    </div>
    <RequestTaskInput
      v-model="userRegistrationForm.nickname"
      :placeholderText="'회원의 아이디를 입력해주세요'"
      :isEdit="true"
      :is-invalidate="isInvalidate"
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
    <DepartmentDropDown
      v-model="userRegistrationForm.department"
      :is-invalidate="isInvalidate" />
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
      submitText="수정" />
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>회원정보가 수정되었습니다</template>
    </ModalView>
  </div>
</template>

<script lang="ts" setup>
import { getDepartmentsAdmin, getMemberDetailAdmin, updateMemberAdmin } from '@/api/admin'
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
import ModalView from '../common/ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'
import DepartmentDropDown from './DepartmentDropDown.vue'

const route = useRoute()
const router = useRouter()

const usernameRegex = /^[a-z]{3,10}\.[a-z]{1,5}$/
const emailRegex = /^@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

const userRegistrationForm = ref(INITIAL_USER_REGISTRATION)
const isInvalidate = ref('')
const userId = ref(route.query.id)
const userData = ref<UserRegistrationProps | null>(null)
const isModalVisible = ref(false)
const isError = ref(false)

const isManager = computed(() => userRegistrationForm.value.role === '담당자')
const filteredRoleKeys = computed(() => {
  if (userRegistrationForm.value.department?.isManager) {
    return RoleKeys
  }
  return RoleKeys.filter(role => role !== '담당자')
})

watch(
  () => router.currentRoute.value.query.id,
  newId => {
    userId.value = newId
  }
)

watch(
  () => userRegistrationForm.value.department?.isManager,
  newValue => {
    if (!newValue && userRegistrationForm.value.role === '담당자') {
      userRegistrationForm.value.role = '사용자'
    }
  }
)
onMounted(async () => {
  if (typeof userId.value === 'string') {
    userData.value = await getMemberDetailAdmin(userId.value)
  }
  if (userData.value && userData.value.role in RoleMapping) {
    const departments = await getDepartmentsAdmin()
    userRegistrationForm.value = {
      ...userData.value,
      department: departments.find(
        (dep: { departmentId: number | undefined }) =>
          dep.departmentId === userData.value?.departmentId
      ),
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
  try {
    if (!userRegistrationForm.value.name) {
      isInvalidate.value = 'nameEmpty'
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
      isInvalidate.value = 'depertmentEmpty'
      return
    }
    if (typeof userId.value === 'string') {
      const formData = {
        role: RoleTypeMapping[userRegistrationForm.value.role],
        name: userRegistrationForm.value.name,
        isReviewer: isManager.value ? userRegistrationForm.value.isReviewer : false,
        departmentId: userRegistrationForm.value.department.departmentId,
        departmentRole: userRegistrationForm.value.departmentRole
      }
      console.log(formData)

      await updateMemberAdmin(userId.value, formData)
      isModalVisible.value = true
    }
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
