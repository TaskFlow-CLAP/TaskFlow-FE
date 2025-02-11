<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :is-open="isModalVisible.add"
      type="successType"
      @close="handleAddModal">
      <template #header>카테고리가 {{ route.params.id ? '수정' : '등록' }}되었습니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.cancel"
      type="warningType"
      @close="handleCancelModal"
      @click="handleGoBack">
      <template #header>{{ route.params.id ? '수정' : '생성' }}을 취소 하시겠습니까?</template>
      <template #body>작성하신 내용은 사라집니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.fail"
      type="failType"
      @close="handleFailModal">
      <template #header>{{ errorMessage }}</template>
    </ModalView>
    <RequestTaskDropdown
      v-model="mainCategory"
      :options="categoryOptions.map(el => el.name)"
      label-name="1차 카테고리"
      placeholder-text="1차 카테고리를 선택해주세요"
      v-if="categoryStep == '2'"
      :disabled="route.params.id !== undefined" />
    <RequestTaskInput
      v-model="categoryForm.name"
      placeholder-text="카테고리명을 입력해주세요"
      :label-name="`${categoryStep}차 카테고리명`" />
    <RequestTaskInput
      v-model="categoryForm.code"
      placeholder-text="카테고리의 고유코드를 입력해주세요"
      label-name="고유코드 (대문자 영어 2글자까지)"
      :is-invalidate="isCodeInvalidate" />

    <div
      v-if="categoryStep === '2'"
      class="flex flex-col gap-2">
      <p class="text-body text-xs font-bold">부가설명 템플릿</p>
      <textarea
        class="w-full h-32 border border-border-1 px-4 py-2 resize-none focus:outline-none rounded"
        :value="categoryForm.descriptionExample"
        :placeholder="'부가설명 템플릿을 작성해주세요'"
        @input="onValueChange">
      </textarea>
    </div>

    <FormButtonContainer
      :handle-cancel="handleCancel"
      :handle-submit="handleSubmit"
      cancel-text="취소"
      :submit-text="route.params.id ? '수정' : '추가'" />
  </div>
</template>

<script lang="ts" setup>
import { CATEGORY_FORM } from '@/constants/admin'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'
import { axiosInstance } from '@/utils/axios'
import { getMainCategory } from '@/api/common'
import type { Category, CategoryForm } from '@/types/common'
import ModalView from '../common/ModalView.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const { categoryStep } = defineProps<{
  categoryStep: string
}>()

const isModalVisible = ref({ add: false, cancel: false, fail: false })
const errorMessage = ref('')

const categoryForm = ref<CategoryForm>(CATEGORY_FORM)

const handleAddModal = () => {
  isModalVisible.value.add = false
  handleGoBack()
}
const handleCancelModal = () => {
  isModalVisible.value.cancel = !isModalVisible.value.cancel
}
const handleFailModal = (message: string = '카테고리 정보를 확인해주세요') => {
  errorMessage.value = message
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
    const categoryId = route.params.id
    if (categoryId) {
      const patchUrl = `/api/managements/categories/${categoryId}`
      await axiosInstance.patch(patchUrl, categoryForm.value)
    } else {
      const postUrl =
        categoryStep === '1' ? '/api/managements/main-category' : '/api/managements/sub-category'
      await axiosInstance.post(postUrl, categoryForm.value)
    }
    isModalVisible.value.add = true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data === 'TASK_013') {
        handleFailModal('중복된 카테고리명\n혹은 고유코드입니다')
      } else {
        handleFailModal()
      }
    }
  }
}

const isCodeInvalidate = computed(() => {
  const code = categoryForm.value.code
  if (code.length === 0) return ''

  const isInvalidate = !/^[A-Z]{1,2}$/.test(code)
  return isInvalidate ? 'code' : ''
})

const mainCategory = ref('1차 카테고리를 선택해주세요')
const categoryOptions = ref<Category[]>([])
onMounted(async () => {
  const id = Number(route.params.id)
  categoryForm.value = { ...CATEGORY_FORM }
  if (categoryStep === '1') {
    if (id) {
      const mainCategories: Category[] = await getMainCategory()
      const initialValue = mainCategories.find(el => el.id === id)
      if (initialValue) {
        categoryForm.value = { name: initialValue.name, code: initialValue.code }
      }
    }
  } else if (categoryStep === '2') {
    categoryOptions.value = await getMainCategory()
    if (id) {
      const { data: initialValue } = await axiosInstance.get(`/api/sub-categories/${id}`)
      if (initialValue) {
        categoryForm.value = {
          name: initialValue.name,
          code: initialValue.code,
          mainCategoryId: initialValue.mainCategoryId,
          descriptionExample: initialValue.descriptionExample
        }
        mainCategory.value =
          categoryOptions.value.find(el => el.id === initialValue.mainCategoryId)?.name || ''
      }
    }
  }
})
watch(mainCategory, () => {
  categoryForm.value.mainCategoryId = categoryOptions.value.find(
    el => el.name === mainCategory.value
  )?.id
})

const onValueChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  categoryForm.value.descriptionExample = target.value
}
</script>
