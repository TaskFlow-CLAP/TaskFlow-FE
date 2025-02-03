<template>
  <div class="w-full flex flex-col gap-y-6">
    <CategoryDropDown
      v-model="category1"
      :options="mainCategoryArr"
      :label-name="'1차 카테고리'"
      :placeholderText="'1차 카테고리를 선택해주세요'"
      :isDisabled="false" />
    <CategoryDropDown
      v-model="category2"
      :options="afterSubCategoryArr"
      :label-name="'2차 카테고리'"
      :placeholderText="'2차 카테고리를 선택해주세요'"
      :isDisabled="!category1" />
    <RequestTaskInput
      v-model="title"
      :placeholderText="'제목을 입력해주세요'"
      :label-name="'제목'"
      :is-invalidate="isInvalidate" />
    <RequestTaskTextArea
      v-model="description"
      :placeholderText="'부가 정보를 입력해주세요'" />
    <RequestTaskFileInput v-model="file" />
    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="요청" />
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>작업이 요청되었습니다</template>
    </ModalView>
  </div>
</template>

<script lang="ts" setup>
import { getMainCategory, getSubCategory } from '@/api/common'
import { postTaskRequest } from '@/api/user'
import type { Category, SubCategory } from '@/types/common'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import CategoryDropDown from './CategoryDropDown.vue'
import RequestTaskFileInput from './RequestTaskFileInput.vue'
import RequestTaskInput from './RequestTaskInput.vue'
import RequestTaskTextArea from './RequestTaskTextArea.vue'

const category1 = ref<Category | null>(null)
const category2 = ref<Category | null>(null)

const title = ref('')
const description = ref('')
const file = ref(null as File[] | null)
const isInvalidate = ref('')
const isModalVisible = ref(false)

const mainCategoryArr = ref<Category[]>([])
const subCategoryArr = ref<SubCategory[]>([])
const afterSubCategoryArr = ref<SubCategory[]>([])

onMounted(async () => {
  mainCategoryArr.value = await getMainCategory()
  subCategoryArr.value = await getSubCategory()
  afterSubCategoryArr.value = await getSubCategory()
})

watch(category1, async newValue => {
  category2.value = null
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === newValue?.id
  )
})

const mainCategoryArr = ref<MainCategoryTypes[]>([])
const subCategoryArr = ref<SubCategoryTypes[]>([])
const afterSubCategoryArr = ref<SubCategoryTypes[]>([])

onMounted(async () => {
  mainCategoryArr.value = await getMainCategory()
  subCategoryArr.value = await getSubCategory()
  afterSubCategoryArr.value = await getSubCategory()
})

watch(category1, async newValue => {
  category2.value = null
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === newValue?.id
  )
})

const router = useRouter()

const handleCancel = () => {
  category1.value = null
  category2.value = null
  title.value = ''
  description.value = ''
  file.value = []
  router.back()
}

const handleSubmit = async () => {
  if (!category1.value || !category2.value) {
    isInvalidate.value = 'category'
    console.log(isInvalidate.value, '변경됨')
    return
  } else if (!title.value) {
    isInvalidate.value = 'input'
    return
  }
  const formData = new FormData()
  const taskInfo = {
    categoryId: category2.value?.id,
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
    const res = await postTaskRequest(formData)
    console.error('요청 성공:', res)
  } catch (error) {
    console.error('요청 실패:', error)
  }
}
</script>
