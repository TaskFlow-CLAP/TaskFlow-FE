<template>
  <div>
    <div class="text-xs text-body font-bold mb-2">첨부 파일</div>
    <input
      class="hidden"
      type="file"
      id="file"
      multiple
      @change="handleFileUpload" />
    <label v-if="hasFiles">
      <RequestTaskFileInputAfter
        :files="modelValue"
        :removeFile="removeFile" />
    </label>
    <div
      v-else
      :class="[
        'w-full h-32 flex flex-col gap-4 items-center justify-center mt-2 rounded py-[31px] bg-white border-2 border-dashed',
        isDragging ? 'border-primary1' : 'border-border-1'
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop">
      <div :class="['text-sm font-bold', isDragging ? 'text-primary1' : 'text-disabled']">
        첨부할 파일을 끌어 놓으세요
      </div>
      <label
        for="file"
        class="button-medium-primary !h-fit">
        <CommonIcons :name="uploadIcon" />
        <p>파일 선택</p>
      </label>
    </div>
    <ModalView
      :is-open="isModalVisible"
      type="failType"
      @close="handleModal">
      <template #header>파일추가를 실패했습니다</template>
      <template #body>최대 5개, 각 5mb까지 가능합니다</template>
    </ModalView>
  </div>
</template>

<script lang="ts" setup>
import CommonIcons from '@/components/common/CommonIcons.vue'
import { uploadIcon } from '@/constants/iconPath'
import { computed, ref } from 'vue'
import ModalView from '../common/ModalView.vue'
import RequestTaskFileInputAfter from './RequestTaskFileInputAfter.vue'

const { modelValue } = defineProps<{
  modelValue: File[] | null
}>()
const emit = defineEmits(['update:modelValue'])

const hasFiles = computed(() => modelValue && modelValue.length > 0)
const isDragging = ref(false)
const isModalVisible = ref(false)

const handleModal = () => {
  isModalVisible.value = !isModalVisible.value
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const newFiles = Array.from(target.files).filter(file => file.size <= 5 * 1024 * 1024)
    if (newFiles.length !== target.files.length) {
      handleModal()
      return
    }
    const updatedFiles = modelValue ? [...modelValue, ...newFiles] : newFiles
    if (updatedFiles.length > 5) {
      handleModal()
      return
    }
    emit('update:modelValue', updatedFiles.length === 1 ? [updatedFiles[0]] : updatedFiles)
  }
}

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const newFiles = Array.from(files).filter(file => file.size <= 5 * 1024 * 1024)
    if (newFiles.length !== files.length) {
      handleModal()
      return
    }
    const updatedFiles = modelValue ? [...modelValue, ...newFiles] : newFiles
    if (updatedFiles.length > 5) {
      handleModal()
      return
    }
    emit('update:modelValue', updatedFiles.length === 1 ? [updatedFiles[0]] : updatedFiles)
  }
}

const removeFile = (index: number) => {
  if (modelValue) {
    const updatedFiles = [...modelValue]
    updatedFiles.splice(index, 1)
    emit('update:modelValue', updatedFiles)
  }
}
</script>
