<template>
  <div class="w-[552px] flex flex-col gap-y-6">
    <RequestTaskDropdown
      v-model="category1"
      :options="REQUEST_TASK_CATEGORIES"
      :label-name="'1차 카테고리'"
      :placeholderText="'1차 카테고리를 선택해주세요'" />
    <RequestTaskDropdown
      v-model="category2"
      :options="REQUEST_TASK_CATEGORIES"
      :label-name="'2차 카테고리'"
      :placeholderText="'2차 카테고리를 선택해주세요'" />
    <RequestTaskInput
      v-model="title"
      :placeholderText="TITLE_PLACEHOLDER" />
    <RequestTaskTextArea
      v-model="description"
      :placeholderText="EXPLANATION_PLACEHOLDER" />
    <RequestTaskFileInput v-model="file" />
    <div class="w-full justify-center flex gap-6 mt-4">
      <button
        class="w-[188px] h-[52px] rounded text-white bg-primary1 flex items-center justify-center"
        @click="handleSubmit">
        요청
      </button>
      <button
        class="w-[188px] h-[52px] border border-disabled rounded text-disabled bg-white flex items-center justify-center"
        @click="handleCancel">
        취소
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  EXPLANATION_PLACEHOLDER,
  REQUEST_TASK_CATEGORIES,
  TITLE_PLACEHOLDER
} from '@/constants/user'
import { ref } from 'vue'
import RequestTaskDropdown from './RequestTaskDropdown.vue'
import RequestTaskFileInput from './RequestTaskFileInput.vue'
import RequestTaskInput from './RequestTaskInput.vue'
import RequestTaskTextArea from './RequestTaskTextArea.vue'

const category1 = ref('')
const category2 = ref('')
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
