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
    <ManagerDropdown
      v-model="approveData.processor"
      :placeholderText="'담당자를 선택해주세요'"
      :is-invalidate="isInvalidate" />
    <div class="flex flex-col gap-2">
      <div class="flex gap-1">
        <p class="text-body text-xs font-bold">마감기한</p>
        <p
          v-if="isInvalidate === 'date'"
          class="text-red-1 text-xs">
          기한정보를 모두 입력하세요
        </p>
      </div>
      <div class="flex w-full justify-center gap-6">
        <DueDateInput
          v-model="approveData.dueDate"
          :is-invalidate="isInvalidate"
          inputType="date" />
        <DueDateInput
          v-model="approveData.dueTime"
          :is-invalidate="isInvalidate"
          inputType="time" />
      </div>
    </div>
    <LabelDropdown
      v-model="approveData.label"
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
import { getTaskDetailUser, postTaskApprove } from '@/api/user'
import { INITIAL_REQUEST_APPROVE_DATA } from '@/constants/manager'
import type { Category, SubCategory } from '@/types/common'
import { convertToISO } from '@/utils/date'
import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import ModalView from '../ModalView.vue'
import CategoryDropDown from '../request-task/CategoryDropDown.vue'
import DueDateInput from './DueDateInput.vue'
import LabelDropdown from './LabelDropdown.vue'
import ManagerDropdown from './ManagerDropdown.vue'

const isModalVisible = ref(false)
const category1 = ref<Category | null>(null)
const category2 = ref<Category | null>(null)
const mainCategoryArr = ref<Category[]>([])
const subCategoryArr = ref<SubCategory[]>([])
const afterSubCategoryArr = ref<SubCategory[]>([])
const approveData = ref(INITIAL_REQUEST_APPROVE_DATA)

const isInvalidate = ref('')
const isFirst = ref(true)

const router = useRouter()
const route = useRouter().currentRoute.value
const requestId = Array.isArray(route.query.requestId)
  ? Number(route.query.requestId[0])
  : Number(route.query.requestId)

onBeforeRouteLeave((to, from, next) => {
  approveData.value = INITIAL_REQUEST_APPROVE_DATA
  next()
})

onMounted(async () => {
  mainCategoryArr.value = await getMainCategory()
  subCategoryArr.value = await getSubCategory()
  const data = await getTaskDetailUser(requestId)
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

const handleCancel = () => {
  isModalVisible.value = false
  router.back()
}

const handleSubmit = async () => {
  if (!category1.value || !category2.value) {
    isInvalidate.value = 'category'
    return
  }
  if (!approveData.value.processor?.memberId) {
    isInvalidate.value = 'manager'
    return
  }
  if (
    (approveData.value.dueDate && !approveData.value.dueTime) ||
    (!approveData.value.dueDate && approveData.value.dueTime)
  ) {
    isInvalidate.value = 'date'
    return
  }

  const requestData = {
    categoryId: category2.value.id,
    processorId: approveData.value.processor.memberId,
    dueDate: convertToISO(approveData.value.dueDate, approveData.value.dueTime),
    labelId: approveData.value.label?.labelId || null
  }

  try {
    await postTaskApprove(requestId, requestData)
    isModalVisible.value = true
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
}
</script>
