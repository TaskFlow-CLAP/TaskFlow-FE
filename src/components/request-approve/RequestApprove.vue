<template>
  <div class="w-[552px] flex flex-col gap-y-6">
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header> 요청이 승인되었습니다 </template>
    </ModalView>
    <RequestTaskDropdown
      v-model="approveForm.category1"
      :options="DUMMY_REQUEST_TASK_CATEGORIES"
      :label-name="'1차 카테고리'"
      :placeholderText="'1차 카테고리를 선택해주세요'" />
    <RequestTaskDropdown
      v-model="approveForm.category2"
      :options="DUMMY_REQUEST_TASK_CATEGORIES"
      :label-name="'2차 카테고리'"
      :placeholderText="'2차 카테고리를 선택해주세요'" />
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
import { INITIAL_REQUEST_APPROVE_FORM } from '@/constants/manager'
import {
  DUMMY_REQUEST_PROCESSORS,
  DUMMY_REQUEST_TASK_CATEGORIES,
  DUMMY_REQUEST_TASK_LABELS
} from '@/datas/taskdetail'
import { ref } from 'vue'
import ModalView from '../ModalView.vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import DueDateInput from './DueDateInput.vue'
import ProcessorDropdown from './ProcessorDropdown.vue'
import FormButtonContainer from '../common/FormButtonContainer.vue'

const isModalVisible = ref(false)
const approveForm = ref(INITIAL_REQUEST_APPROVE_FORM)

const handleCancel = () => {
  approveForm.value = { ...INITIAL_REQUEST_APPROVE_FORM }
  isModalVisible.value = false
}

const handleSubmit = () => {
  const formData = new FormData()
  formData.append('approveForm', JSON.stringify(approveForm.value))
  console.log(JSON.parse(formData.get('approveForm') as string))
  isModalVisible.value = true
}
</script>
