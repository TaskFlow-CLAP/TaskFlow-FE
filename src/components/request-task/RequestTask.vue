<template>
  <div class="w-full flex flex-col gap-y-6">
    <CategoryDropDown
      v-model="category1"
      :options="mainCategoryArr"
      :label-name="'1차 카테고리'"
      :placeholderText="'1차 카테고리를 선택해주세요'"
      :is-invalidate="isInvalidate === 'category1' ? 'category' : ''"
      :isDisabled="false" />
    <CategoryDropDown
      v-model="category2"
      :options="afterSubCategoryArr"
      :label-name="'2차 카테고리'"
      :placeholderText="'2차 카테고리를 선택해주세요'"
      :is-invalidate="isInvalidate === 'category2' ? 'category' : ''"
      :isDisabled="!category1" />
    <RequestTaskInput
      v-model="title"
      :placeholderText="'제목을 입력해주세요'"
      :label-name="'제목'"
      :is-invalidate="isInvalidate === 'input' ? 'input' : ''"
      :limit-length="30" />
    <RequestTaskTextArea
      v-model="description"
      :is-invalidate="isInvalidate"
      :placeholderText="'부가 설명을 입력해주세요'"
      :limit-length="200" />
    <RequestTaskFileInput
      v-model="file"
      :isUploading="isUploading" />
    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="요청" />
    <ModalView
      :isOpen="isModalVisible === 'success'"
      :type="'successType'"
      @close="handleCancel">
      <template #header>작업이 요청되었습니다</template>
    </ModalView>
    <ModalView
      :isOpen="isModalVisible === 'loading'"
      type="loadingType">
      <template #header>작업을 요청 중입니다...</template>
      <template #body>잠시만 기다려주세요</template>
    </ModalView>
  </div>
</template>

<script lang="ts" setup>
import { getMainCategory, getSubCategory } from '@/api/common'
import { getSubCategoryDetail, postTaskRequest } from '@/api/user'
import type { Category, SubCategory } from '@/types/common'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import ModalView from '../common/ModalView.vue'
import CategoryDropDown from './CategoryDropDown.vue'
import RequestTaskFileInput from './RequestTaskFileInput.vue'
import RequestTaskInput from './RequestTaskInput.vue'
import RequestTaskTextArea from './RequestTaskTextArea.vue'

const category1 = ref<Category | null>(null)
const category2 = ref<SubCategory | null>(null)

const title = ref('')
const description = ref('')
const file = ref(null as File[] | null)

const isInvalidate = ref('')
const isModalVisible = ref('')
const isSubmitting = ref(false)
const isUploading = ref(false)

const mainCategoryArr = ref<Category[]>([])
const subCategoryArr = ref<SubCategory[]>([])
const afterSubCategoryArr = ref<SubCategory[]>([])

onMounted(async () => {
  mainCategoryArr.value = await getMainCategory()
  console.log(mainCategoryArr.value)

  subCategoryArr.value = await getSubCategory()
  afterSubCategoryArr.value = await getSubCategory()
  console.log(subCategoryArr.value)
})

watch(category1, async newValue => {
  category2.value = null
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === newValue?.mainCategoryId
  )
})

watch(category2, async newVal => {
  if (newVal) {
    const res = await getSubCategoryDetail(newVal.subCategoryId)
    description.value = res.descriptionExample
  }
})

const router = useRouter()

const handleCancel = () => {
  category1.value = null
  category2.value = null
  title.value = ''
  description.value = ''
  file.value = []
  isModalVisible.value = ''
  router.back()
}

const handleSubmit = async () => {
  if (isSubmitting.value || isModalVisible.value) return

  if (!category1.value) {
    isInvalidate.value = 'category1'
    return
  } else if (!category2.value) {
    isInvalidate.value = 'category2'
    return
  } else if (!title.value) {
    isInvalidate.value = 'input'
    return
  } else if (title.value.length > 30) {
    isInvalidate.value = 'title'
    return
  } else if (description.value.length > 200) {
    isInvalidate.value = 'description'
    return
  }

  isSubmitting.value = true
  isUploading.value = true
  isModalVisible.value = 'loading'

  const formData = new FormData()
  const taskInfo = {
    categoryId: category2.value.subCategoryId,
    title: title.value,
    description: description.value
  }
  const jsonTaskInfo = JSON.stringify(taskInfo)
  const newBlob = new Blob([jsonTaskInfo], { type: 'application/json' })
  formData.append('taskInfo', newBlob)

  if (file.value && file.value.length > 0) {
    file.value.forEach(f => formData.append('attachment', f))
  }

  try {
    await postTaskRequest(formData)
    isModalVisible.value = 'success'
  } finally {
    if (isModalVisible.value !== 'success') isModalVisible.value = ''
    isSubmitting.value = false
    isUploading.value = false
  }
}
</script>
