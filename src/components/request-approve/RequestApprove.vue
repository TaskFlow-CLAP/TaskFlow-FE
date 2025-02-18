<template>
  <div class="w-full flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>요청이 승인되었습니다</template>
    </ModalView>
    <CategoryDropDown
      v-model="category1"
      :options="mainCategoryArr"
      :label-name="'1차 카테고리'"
      :isInvalidate="isInvalidate === 'category1' ? 'category' : ''"
      :isDisabled="false" />
    <CategoryDropDown
      v-model="category2"
      :options="afterSubCategoryArr"
      :label-name="'2차 카테고리'"
      :isInvalidate="isInvalidate === 'category2' ? 'category' : ''"
      :isDisabled="!category1" />
    <ManagerDropdown
      v-model="approveData.processor"
      :placeholderText="'담당자를 선택해주세요'"
      :is-invalidate="isInvalidate === 'manager' ? 'manager' : ''" />
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <p class="text-body text-xs font-semibold">마감기한</p>
        <p
          v-if="!isDueDateValid && approveData.dueDate && approveData.dueTime"
          class="text-red-1 text-xs">
          현재 시간 이후로 설정해주세요
        </p>
        <p
          v-else-if="isInvalidate === 'date'"
          class="text-red-1 text-xs">
          기한정보를 모두 입력하세요
        </p>
      </div>

      <div class="flex w-full justify-center gap-6">
        <DueDateInput
          v-model="approveData.dueDate"
          inputType="date"
          :is-invalidate="isInvalidate === 'date' ? 'date' : ''" />
        <DueDateInput
          v-model="approveData.dueTime"
          inputType="time"
          :is-invalidate="isInvalidate === 'date' ? 'date' : ''" />
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
import { useErrorStore } from '@/stores/error'
import type { Category, SubCategory } from '@/types/common'
import { convertToISO, isAfterNow } from '@/utils/date'
import getPossibleCategory from '@/utils/possibleCategory'
import { redirectToLogin } from '@/utils/redirectToLogin'
import { computed, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import FormButtonContainer from '../common/FormButtonContainer.vue'
import ModalView from '../common/ModalView.vue'
import CategoryDropDown from '../request-task/CategoryDropDown.vue'
import DueDateInput from './DueDateInput.vue'
import LabelDropdown from './LabelDropdown.vue'
import ManagerDropdown from './ManagerDropdown.vue'

const isModalVisible = ref(false)
const category1 = ref<Category | null>(null)
const category2 = ref<SubCategory | null>(null)
const mainCategoryArr = ref<Category[]>([])
const subCategoryArr = ref<SubCategory[]>([])
const afterSubCategoryArr = ref<SubCategory[]>([])
const approveData = ref(INITIAL_REQUEST_APPROVE_DATA)
const isInvalidate = ref('')
const isApproving = ref(false)
const isFirst = ref(true)

const router = useRouter()
const route = useRouter().currentRoute.value
const requestId = Array.isArray(route.query.requestId)
  ? Number(route.query.requestId[0])
  : Number(route.query.requestId)

const isTimeFilled = computed(() => {
  return (
    (approveData.value.dueDate && !approveData.value.dueTime) ||
    (!approveData.value.dueDate && approveData.value.dueTime)
  )
})

const isTimeComplete = computed(() => {
  return approveData.value.dueDate && approveData.value.dueTime
})

const isDueDateValid = computed(() => {
  return isAfterNow(approveData.value.dueDate, approveData.value.dueTime)
})

onBeforeRouteLeave((to, from, next) => {
  approveData.value = INITIAL_REQUEST_APPROVE_DATA
  next()
})

onMounted(async () => {
  const { setError } = useErrorStore()
  if (!requestId) {
    setError('존재하지 않는 요청입니다', '', () => redirectToLogin('/requested'))
    return
  }
  const mainCategory = await getMainCategory()
  const mainIds = await getPossibleCategory()
  const filteredMainCategory = mainCategory.filter((category: Category) =>
    mainIds.includes(category.mainCategoryId)
  )
  mainCategoryArr.value = filteredMainCategory
  subCategoryArr.value = await getSubCategory()
  const data = await getTaskDetailUser(requestId)
  const selected = mainCategoryArr.value.find(ct => ct.name === data.mainCategoryName) || null
  category1.value = selected
  category2.value = subCategoryArr.value.find(ct => ct.name === data.categoryName) || null
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === selected?.mainCategoryId
  )
})

watch(category1, async newValue => {
  if (isFirst.value) isFirst.value = false
  else category2.value = null
  afterSubCategoryArr.value = subCategoryArr.value.filter(
    subCategory => subCategory.mainCategoryId === newValue?.mainCategoryId
  )
})

const handleCancel = () => {
  isModalVisible.value = false
  router.back()
}

const handleSubmit = async () => {
  if (isApproving.value || isModalVisible.value) return
  if (!category1.value) {
    isInvalidate.value = 'category1'
    return
  }
  if (!category2.value) {
    isInvalidate.value = 'category2'
    return
  }
  if (!approveData.value.processor?.memberId) {
    isInvalidate.value = 'manager'
    return
  }
  if (isTimeFilled.value) {
    isInvalidate.value = 'date'
    return
  }
  if (isTimeComplete.value && !isDueDateValid.value) {
    isInvalidate.value = ''
    return
  }
  isApproving.value = true

  const requestData = {
    categoryId: category2.value.subCategoryId,
    processorId: approveData.value.processor.memberId,
    dueDate:
      !isTimeFilled.value && approveData.value.dueDate && approveData.value.dueTime
        ? convertToISO(approveData.value.dueDate, approveData.value.dueTime)
        : null,
    labelId: approveData.value.label?.labelId || null
  }

  await postTaskApprove(requestId, requestData)
  isModalVisible.value = true
}
</script>
