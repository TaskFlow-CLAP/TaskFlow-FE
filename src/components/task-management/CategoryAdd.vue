<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :is-open="isModalVisible.add"
      type="successType"
      @close="handleAddModal">
      <template #header>카테고리가 {{ route.params.id ? '수정' : '추가' }}되었습니다</template>
    </ModalView>
    <ModalView
      :is-open="isModalVisible.cancel"
      type="warningType"
      @close="handleCancelModal"
      @click="handleGoBack">
      <template #header>{{ route.params.id ? '수정을' : '추가를' }} 취소 하시겠습니까?</template>
      <template #body>작성하신 내용은 사라집니다</template>
    </ModalView>
    <RequestTaskDropdown
      v-model="mainCategory"
      :options="categoryOptions.map(el => el.name)"
      label-name="1차 카테고리"
      placeholder-text="1차 카테고리를 선택해주세요"
      v-if="categoryStep == '2'"
      :disabled="route.params.id !== undefined"
      :is-invalidate="!hasMainCategory" />
    <RequestTaskInput
      v-model="categoryForm.name"
      placeholder-text="카테고리명을 입력해주세요"
      :label-name="`${categoryStep}차 카테고리명`"
      :is-invalidate="errorMessage.categoryName"
      :limitLength="30" />
    <RequestTaskInput
      v-model="categoryForm.code"
      placeholder-text="카테고리의 작업코드를 입력해주세요"
      label-name="작업코드 (대문자 영어 2글자까지)"
      :is-invalidate="errorMessage.categoryCode === 'noCode' ? 'noCode' : isCodeInvalidate" />
    <div
      v-if="categoryStep === '2'"
      class="flex flex-col gap-2 relative">
      <div class="flex gap-1 text-xs">
        <p class="text-body font-semibold">부가설명 템플릿</p>
        <p
          class="text-red-1"
          v-if="errorMessage.description === 'tooLong'">
          템플릿은 100자 이내로 적어주세요
        </p>
      </div>
      <textarea
        class="w-full h-32 border border-border-1 px-4 py-2 resize-none focus:outline-none rounded"
        :value="categoryForm.descriptionExample"
        :maxlength="100"
        :placeholder="'부가설명 템플릿을 작성해주세요'"
        @input="onValueChange">
      </textarea>
      <p class="absolute text-xs top-[calc(100%+4px)] w-full flex justify-end text-body">
        {{ categoryForm.descriptionExample?.length || 0 }}/{{ 100 }}
      </p>
    </div>

    <FormButtonContainer
      :handle-cancel="handleCancel"
      :handle-submit="handleSubmit"
      cancel-text="취소"
      :submit-text="route.params.id ? '수정' : '추가'" />
  </div>
</template>

<script lang="ts" setup>
import { getMainCategory } from '@/api/common'
import { CATEGORY_FORM } from '@/constants/admin'
import type { Category, CategoryForm } from '@/types/common'
import { axiosInstance } from '@/utils/axios'
import DOMPurify from 'dompurify'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import ModalView from '../common/ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import RequestTaskInput from '../request-task/RequestTaskInput.vue'

const router = useRouter()
const route = useRoute()

const { categoryStep } = defineProps<{
  categoryStep: string
}>()

const isModalVisible = ref({ add: false, cancel: false, fail: false })
const errorMessage = ref({ categoryName: '', categoryCode: '', description: '' })
const hasMainCategory = ref(true)

const categoryForm = ref<CategoryForm>(CATEGORY_FORM)
const handleAddModal = () => {
  isModalVisible.value.add = false
  handleGoBack()
}
const handleCancelModal = () => {
  isModalVisible.value.cancel = !isModalVisible.value.cancel
}

const handleCancel = () => {
  handleCancelModal()
}

const handleGoBack = () => {
  router.push('/task-management')
}

const handleSubmit = async () => {
  hasMainCategory.value = true
  errorMessage.value = { categoryCode: '', categoryName: '', description: '' }
  if (!categoryForm.value.mainCategoryId && categoryStep === '2') {
    hasMainCategory.value = false
    return
  } else if (isCodeInvalidate.value) {
    errorMessage.value.categoryCode = 'code'
    return
  } else if (categoryForm.value.name.length === 0) {
    errorMessage.value.categoryName = 'categoryName'
    return
  } else if (categoryForm.value.code.length === 0) {
    errorMessage.value.categoryCode = 'noCode'
    return
  } else if ((categoryForm.value.descriptionExample ?? '').length > 100) {
    errorMessage.value.description = 'tooLong'
    return
  }

  categoryForm.value.name = DOMPurify.sanitize(categoryForm.value.name)
  categoryForm.value.code = DOMPurify.sanitize(categoryForm.value.code)
  if (categoryForm.value.descriptionExample) {
    categoryForm.value.descriptionExample = DOMPurify.sanitize(
      categoryForm.value.descriptionExample
    )
  }

  const categoryId = route.params.id
  if (categoryId) {
    const newForm: CategoryForm = { ...categoryForm.value, mainCategoryId: undefined }
    const patchUrl = `/api/managements/categories/${categoryId}`
    await axiosInstance.patch(patchUrl, newForm)
  } else {
    const postUrl =
      categoryStep === '1' ? '/api/managements/main-category' : '/api/managements/sub-category'
    await axiosInstance.post(postUrl, categoryForm.value)
  }
  isModalVisible.value.add = true
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
      const initialValue = mainCategories.find(el => el.mainCategoryId === id)
      if (initialValue) {
        categoryForm.value = { name: initialValue.name, code: initialValue.code }
      }
    }
  } else if (categoryStep === '2') {
    const mainCategories: Category[] = await getMainCategory()
    categoryOptions.value = mainCategories
    if (!id) {
      const mainCategoryId = ref(Number(route.query.mainCategoryId))
      categoryForm.value.mainCategoryId = mainCategoryId.value
      mainCategory.value =
        categoryOptions.value.find(el => el.mainCategoryId === mainCategoryId.value)?.name ||
        '1차 카테고리를 선택해주세요'
    }
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
          categoryOptions.value.find(el => el.mainCategoryId === initialValue.mainCategoryId)
            ?.name || ''
      }
    }
  }
})
watch(mainCategory, () => {
  categoryForm.value.mainCategoryId = categoryOptions.value.find(
    el => el.name === mainCategory.value
  )?.mainCategoryId
})

const onValueChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  categoryForm.value.descriptionExample = target.value
}
</script>
