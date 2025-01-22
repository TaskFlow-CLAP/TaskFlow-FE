<template>
  <div class="w-[600px] flex flex-col px-6 gap-y-6">
    <div class="w-full h-[54px] border-l-8 border-l-primary1 flex items-center pl-5">
      <h1 class="text-2xl font-bold">작업 요청</h1>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-y-6">
      <RequestTaskDropdown
        :initValue="category1"
        :options="REQUEST_TASK_CATEGORIES" />
      <RequestTaskDropdown
        :initValue="category2"
        :options="REQUEST_TASK_CATEGORIES" />
      <RequestTaskInput :initValue="category1" />
      <div>
        <label
          for="description"
          class="text-xs text-body font-bold">
          부가 설명
        </label>
        <textarea
          class="w-full h-24 mt-2 border border-border-1 px-4 py-2"
          id="description"
          v-model="description"
          placeholder="부가 설명을 입력해주세요">
        </textarea>
      </div>
      <div>
        <label
          for="file"
          class="text-xs text-body font-bold">
          첨부 파일</label
        >
        <input
          class="hidden"
          type="file"
          id="file"
          @change="handleFileUpload" />
        <label
          for="file"
          class="w-[97px] h-8 mt-2 rounded px-4 py-2 bg-primary1 text-white flex items-center justify-center">
          파일 선택
        </label>
      </div>
      <div class="flex">
        <button
          type="submit"
          class="w-[188px] h-[52px] rounded text-white bg-primary1 flex items-center justify-center">
          요청
        </button>
        <button
          type="button"
          class="w-[188px] h-[52px] border border-disabled rounded text-disabled bg-white flex items-center justify-center"
          @click="handleCancel">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { REQUEST_TASK_CATEGORIES } from '@/constants/user'
import { ref } from 'vue'
import RequestTaskDropdown from './RequestTaskDropdown.vue'
import RequestTaskInput from './RequestTaskInput.vue'

const category1 = ref('1차 카테고리를 선택')
const category2 = ref('2차 카테고리를 선택')
const title = ref('')
const description = ref('')
const file = ref(null as File | null)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    file.value = target.files[0]
  }
}

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
    formData.append('file', file.value)
  }
}
</script>

<style scoped></style>
