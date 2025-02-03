<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :is-open="isModalVisible.add"
      type="successType"
      @close="handleAddModal">
      <template #header>카테고리가 등록되었습니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.cancel"
      type="warningType"
      @close="handleCancelModal"
      @click="handleGoBack">
      <template #header>생성을 취소 하시겠습니까?</template>
      <template #body>작성하신 내용은 사라집니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.fail"
      type="failType"
      @close="handleFailModal">
      <template #header>카테고리 정보를 확인해주세요</template>
    </ModalView>
    <!-- 카테고리 목록 API 필요, 임시로 역할로 설정 -->
    <RequestTaskDropdown
      v-model="mainCategory"
      :options="categoryOptions.map(el => el.name)"
      label-name="1차 카테고리"
      placeholder-text="1차 카테고리를 선택해주세요"
      v-if="categoryStep == '2'" />
    <RequestTaskInput
      v-model="categoryForm.name"
      placeholder-text="카테고리명을 입력해주세요"
      :label-name="`${categoryStep}차 카테고리명`" />
    <RequestTaskInput
      v-model="categoryForm.code"
      placeholder-text="카테고리의 고유코드를 입력해주세요"
      label-name="고유코드 (대문자 영어 2글자까지)"
      :is-invalidate="isCodeInvalidate" />

    <FormButtonContainer
      :handle-cancel="handleCancel"
      :handle-submit="handleSubmit"
      cancel-text="취소"
      submit-text="생성" />
  </div>
</template>

<script lang="ts" setup>
import { CATEGORY_FORM } from '@/constants/admin'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import ModalView from '../ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'
import { axiosInstance } from '@/utils/axios'
import { getMainCategory } from '@/api/common'
import type { Category, CategoryForm } from '@/types/common'

const router = useRouter()

const { categoryStep } = defineProps<{
  categoryStep: string
}>()

const isModalVisible = ref({ add: false, cancel: false, fail: false })

const categoryForm = ref<CategoryForm>(CATEGORY_FORM)

const handleAddModal = () => {
  isModalVisible.value.add = false
  handleGoBack()
}
const handleCancelModal = () => {
  isModalVisible.value.cancel = !isModalVisible.value.cancel
}
const handleFailModal = () => {
  isModalVisible.value.fail = !isModalVisible.value.fail
}

const handleCancel = () => {
  handleCancelModal()
}

const handleGoBack = () => {
  router.push('/task-management')
}

const handleSubmit = async () => {
  if (
    isCodeInvalidate.value ||
    categoryForm.value.name.length === 0 ||
    categoryForm.value.code.length === 0 ||
    (categoryStep === '2' && categoryForm.value.mainCategoryId === undefined)
  ) {
    handleFailModal()
    return
  }

  try {
    const requestUrl =
      categoryStep === '1' ? '/api/managements/main-category' : '/api/managements/sub-category'
    await axiosInstance.post(requestUrl, categoryForm.value, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}` }
    })
    isModalVisible.value.add = true
  } catch {
    handleFailModal()
  }
}

const isCodeInvalidate = computed(() => {
  const code = categoryForm.value.code
  if (code.length === 0) return ''

  const isInvalidate = !/^[A-Z]{1,2}$/.test(code)
  return isInvalidate ? 'code' : ''
})

const mainCategory = ref('')
const categoryOptions = ref<Category[]>([])
onMounted(async () => {
  categoryOptions.value = await getMainCategory()
  if (categoryStep === '2')
    categoryForm.value = { ...categoryForm.value, mainCategoryId: undefined }
})
watch(mainCategory, () => {
  categoryForm.value.mainCategoryId = categoryOptions.value.find(
    el => el.name === mainCategory.value
  )?.id
})
</script>
