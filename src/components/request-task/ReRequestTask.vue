<template>
  <div class="w-full flex flex-col gap-y-6">
    <CategoryDropDown
      v-model="category1"
      :options="mainCategoryArr"
      :label-name="'1차 카테고리'"
      :placeholderText="'1차 카테고리를 선택해주세요'"
      :isDisabled="false"
      :is-invalidate="isInvalidate" />
    <CategoryDropDown
      v-model="category2"
      :options="afterSubCategoryArr"
      :label-name="'2차 카테고리'"
      :placeholderText="'2차 카테고리를 선택해주세요'"
      :isDisabled="!category1"
      :is-invalidate="isInvalidate" />
    <RequestTaskInput
      v-model="title"
      :placeholderText="'제목을 입력해주세요'"
      :label-name="'제목'"
      :is-invalidate="isInvalidate" />
    <RequestTaskTextArea
      v-model="description"
      :is-invalidate="isInvalidate"
      :placeholderText="'부가 정보를 입력해주세요'" />
    <RequestTaskFileInput v-model="file" />
    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="수정" />
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>작업이 수정되었습니다</template>
    </ModalView>
  </div>
</template>

<script lang="ts" setup>
import { getMainCategory, getSubCategory } from '@/api/common'
import { getTaskDetailUser, patchTaskRequest, postTaskRequest } from '@/api/user'
import type { Category, SubCategory } from '@/types/common'
import type { AttachmentResponse } from '@/types/user'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import ModalView from '../common/ModalView.vue'
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
const initFileArr = ref<AttachmentResponse[]>([])
const isFirst = ref(true)

const { id, reqType } = defineProps<{ id: string; reqType: string }>()
const router = useRouter()

const handleCancel = () => {
  router.back()
}

onMounted(async () => {
  mainCategoryArr.value = await getMainCategory()
  subCategoryArr.value = await getSubCategory()
  afterSubCategoryArr.value = await getSubCategory()
  const data = await getTaskDetailUser(Number(id))
  const selected = mainCategoryArr.value.find(ct => ct.name === data.mainCategoryName) || null
  category1.value = selected
  category2.value = subCategoryArr.value.find(ct => ct.name === data.categoryName) || null
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === selected?.id
  )
  title.value = data.title
  description.value = data.description
  file.value = data.attachmentResponses.map((attachment: AttachmentResponse) => {
    return new File([attachment.fileUrl], attachment.fileName, { type: 'application/pdf' })
  })
  initFileArr.value = data.attachmentResponses
})

watch(category1, async newValue => {
  if (isFirst.value) {
    isFirst.value = false
  } else {
    category2.value = null
  }
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === newValue?.id
  )
})

const handleSubmit = async () => {
  if (!category2.value) {
    isInvalidate.value = 'category'
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
  const formData = new FormData()

  const attachmentsToDelete = initFileArr.value
    .filter(initFile => !file.value?.some(f => f.name === initFile.fileName))
    .map(initFile => initFile.fileId)

  const taskInfo = {
    categoryId: category2.value.id,
    title: title.value,
    description: description.value
  }

  const taskInfoEdit = {
    ...taskInfo,
    attachmentsToDelete: attachmentsToDelete
  }

  const jsonTaskInfo = JSON.stringify(taskInfoEdit)
  const newBlob = new Blob([jsonTaskInfo], { type: 'application/json' })
  formData.append('taskInfo', newBlob)

  if (file.value && file.value.length > 0 && reqType === 'edit') {
    const newFiles = file.value.filter(
      f => !initFileArr.value.some(initFile => initFile.fileName === f.name)
    )
    newFiles.forEach(f => {
      formData.append('attachment', f)
    })
  } else {
    file.value?.forEach(f => {
      formData.append('attachment', f)
    })
  }

  try {
    if (reqType === 're') {
      await postTaskRequest(formData)
    } else {
      await patchTaskRequest(id, formData)
    }
    isModalVisible.value = true
  } catch (error) {
    console.error('요청 실패:', error)
  }
}
</script>
