<template>
  <div class="w-[552px] flex flex-col gap-y-6">
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
      v-model="approveForm.category2"
      :options="DUMMY_REQUEST_TASK_CATEGORIES"
      :label-name="'2차 카테고리'"
      :placeholderText="'2차 카테고리를 선택해주세요'" />
    <div class="w-full mt-4 flex justify-center">
      <div class="w-[400px] flex gap-6">
        <button
          class="button-large-default"
          @click="handleCancel">
          취소
        </button>
        <button
          class="button-large-primary"
          @click="handleSubmit">
          요청
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DUMMY_REQUEST_PROCESSORS, DUMMY_REQUEST_TASK_CATEGORIES } from '@/datas/taskdetail'
import { ref } from 'vue'
import RequestTaskDropdown from '../request-task/RequestTaskDropdown.vue'
import DueDateInput from './DueDateInput.vue'
import ProcessorDropdown from './ProcessorDropdown.vue'

const approveForm = ref({
  category1: '1차 카테고리를 선택해주세요',
  category2: '2차 카테고리를 선택해주세요',
  processor: '담당자를 선택해주세요',
  labeling: '',
  dueDate: '',
  dueTime: ''
})

const handleCancel = () => {
  approveForm.value.category1 = '1차 카테고리를 선택해주세요'
  approveForm.value.category2 = '2차 카테고리를 선택해주세요'
  approveForm.value.processor = ''
  approveForm.value.labeling = ''
  approveForm.value.dueDate = ''
  approveForm.value.dueTime = ''
}

const handleSubmit = () => {
  const formData = new FormData()
  formData.append('approveForm', JSON.stringify(approveForm.value))
  console.log(JSON.parse(formData.get('approveForm') as string))
}
</script>
