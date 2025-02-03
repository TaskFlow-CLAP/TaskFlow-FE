<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header> 요청이 승인되었습니다 </template>
    </ModalView>
    <CategoryDropDown
      v-model="category1"
      :options="mainCategoryArr"
      :label-name="'1차 카테고리'"
      :isInvalidate="isInvalidate"
      :isDisabled="false" />
    <CategoryDropDown
      v-model="category2"
      :options="afterSubCategoryArr"
      :label-name="'2차 카테고리'"
      :is-invalidate="isInvalidate"
      :isDisabled="!category1" />
    <ProcessorDropdown
      v-model="approveForm.processor"
      :options="DUMMY_REQUEST_PROCESSORS"
      :label-name="'담당자'"
      :placeholderText="'담당자를 선택해주세요'" />
    <div class="flex flex-col gap-2">
      <p class="text-body text-xs font-bold">마감기한</p>
      <div class="flex w-full justify-center gap-6">
        <DueDateInput
          v-model="approveForm.dueDate"
          inputType="date" />
        <DueDateInput
          v-model="approveForm.dueTime"
          inputType="time" />
      </div>
    </div>
    <RequestTaskDropdown
      v-model="approveForm.labeling"
      :options="DUMMY_REQUEST_TASK_LABELS"
      :label-name="'구분'"
      :is-label="true"
      :placeholderText="'구분을 선택해주세요'" />
    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="승인" />
  </div>
</template>

<script lang="ts" setup>
import { getMainCategory, getSubCategory } from '@/api/common'
import { getTaskDetailUser } from '@/api/user'
import { INITIAL_REQUEST_APPROVE_FORM } from '@/constants/manager'
import { DUMMY_REQUEST_PROCESSORS, DUMMY_REQUEST_TASK_LABELS } from '@/datas/taskdetail'
import type { Category, SubCategory } from '@/types/common'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import ModalView from '../ModalView.vue'
import CategoryDropDown from '../request-task/CategoryDropDown.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import DueDateInput from './DueDateInput.vue'
import ProcessorDropdown from './ProcessorDropdown.vue'

const isModalVisible = ref(false)
const category1 = ref<Category | null>(null)
const category2 = ref<Category | null>(null)
const mainCategoryArr = ref<Category[]>([])
const subCategoryArr = ref<SubCategory[]>([])
const afterSubCategoryArr = ref<SubCategory[]>([])
const isInvalidate = ref('')
const isFirst = ref(true)

const router = useRouter()
const route = useRouter().currentRoute.value
const requestId = route.query.requestId
const approveForm = ref(INITIAL_REQUEST_APPROVE_FORM)

onMounted(async () => {
  mainCategoryArr.value = await getMainCategory()
  subCategoryArr.value = await getSubCategory()
  const data = await getTaskDetailUser(Number(requestId))

  const selected = mainCategoryArr.value.find(ct => ct.name === data.mainCategoryName) || null
  category1.value = selected
  category2.value = subCategoryArr.value.find(ct => ct.name === data.categoryName) || null
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === selected?.id
  )
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

console.log(requestId)

const handleCancel = () => {
  approveForm.value = { ...INITIAL_REQUEST_APPROVE_FORM }
  isModalVisible.value = false
  router.back()
}

const handleSubmit = () => {
  const formData = new FormData()
  if (!category1.value || !category2.value) {
    isInvalidate.value = 'category'
    console.log(isInvalidate.value, '변경됨')
    return
  }
  formData.append('approveForm', JSON.stringify(approveForm.value))
  console.log(JSON.parse(formData.get('approveForm') as string))
  isModalVisible.value = true
}
</script>
