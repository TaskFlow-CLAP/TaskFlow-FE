<template>
  <div class="w-[552px] flex flex-col gap-y-6">
    <ModalView
      :isOpen="isAddModalVisible"
      :type="'successType'"
      @close="handleAddModal">
      <template #header> 카테고리가 등록되었습니다 </template>
    </ModalView>
    <ModalView
      :isOpen="isCancelModalVisible"
      :type="'warningType'"
      @close="handleCancelModal"
      @click="handleGoBack">
      <template #header> 생성을 취소 하시겠습니까? </template>
      <template #body> 작성하신 내용은 사라집니다 </template>
    </ModalView>
    <!-- 카테고리 목록 API 필요, 임시로 역할로 설정 -->
    <RequestTaskDropdown
      v-model="categoryForm.firstCategory"
      :options="RoleKeys"
      :label-name="'1차 카테고리'"
      :placeholderText="'1차 카테고리를 선택해주세요'"
      v-if="props.categoryStep == '2'" />
    <RequestTaskInput
      v-model="categoryForm.name"
      :placeholderText="'카테고리명을 입력해주세요'"
      :labelName="'1차 카테고리명'" />
    <RequestTaskInput
      v-model="categoryForm.code"
      :placeholderText="'카테고리의 고유코드를 입력해주세요'"
      :labelName="'고유코드 (대문자 영어 2글자까지)'" />

    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="생성" />
  </div>
</template>

<script lang="ts" setup>
import { CATEGORY_FIRST_ADD, CATEGORY_SECOND_ADD, RoleKeys } from '@/constants/admin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'
import FormButtonContainer from '../common/FormButtonContainer.vue'

const router = useRouter()

const props = defineProps<{
  categoryStep: string
}>()

const isAddModalVisible = ref(false)
const isCancelModalVisible = ref(false)

const categoryForm = ref(props.categoryStep == '1' ? CATEGORY_FIRST_ADD : CATEGORY_SECOND_ADD)

const handleAddModal = () => {
  isAddModalVisible.value = false
}
const handleCancelModal = () => {
  isCancelModalVisible.value = !isCancelModalVisible.value
}

const handleCancel = () => {
  handleCancelModal()
}

const handleGoBack = () => {
  router.push('/task-management')
}

const handleSubmit = () => {
  console.log(categoryForm.value)
  isAddModalVisible.value = true
}
</script>
