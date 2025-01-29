<template>
  <div class="w-[552px] flex flex-col gap-y-6">
    <RequestTaskDropdown
      v-model="category1"
      :options="DUMMY_REQUEST_TASK_CATEGORIES"
      :label-name="'1차 카테고리'"
      :placeholderText="'1차 카테고리를 선택해주세요'" />
    <RequestTaskDropdown
      v-model="category2"
      :options="DUMMY_REQUEST_TASK_CATEGORIES"
      :label-name="'2차 카테고리'"
      :placeholderText="'2차 카테고리를 선택해주세요'" />
    <RequestTaskInput
      v-model="title"
      :placeholderText="TITLE_PLACEHOLDER"
      :label-name="'제목'" />
    <RequestTaskTextArea
      v-model="description"
      :placeholderText="EXPLANATION_PLACEHOLDER" />
    <RequestTaskFileInput v-model="file" />
    <FormButtonContainer
      :handleCancel="handleCancel"
      :handleSubmit="handleSubmit"
      cancelText="취소"
      submitText="요청" />
  </div>
</template>

<script lang="ts" setup>
import { EXPLANATION_PLACEHOLDER, TITLE_PLACEHOLDER } from '@/constants/user'
import { DUMMY_REQUEST_TASK_CATEGORIES } from '@/datas/taskdetail'
import { ref } from 'vue'
import FormButtonContainer from '../user-registration/FormButtonContainer.vue'
import RequestTaskDropdown from './RequestTaskDropdown.vue'
import RequestTaskFileInput from './RequestTaskFileInput.vue'
import RequestTaskInput from './RequestTaskInput.vue'
import RequestTaskTextArea from './RequestTaskTextArea.vue'

const category1 = ref('1차 카테고리를 선택해주세요')
const category2 = ref('2차 카테고리를 선택해주세요')
const title = ref('')
const description = ref('')
const file = ref(null as File[] | null)

const handleCancel = () => {
  category1.value = ''
  category2.value = ''
  title.value = ''
  description.value = ''
  file.value = null
}

const handleSubmit = () => {
  const formData = new FormData()
  formData.append('category1', category1.value)
  formData.append('category2', category2.value)
  formData.append('title', title.value)
  formData.append('description', description.value)
  if (file.value) {
    file.value.forEach(f => {
      formData.append('file', f)
    })
  }
  console.log(Object.fromEntries(formData))
}
</script>
