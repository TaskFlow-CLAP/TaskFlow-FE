<template>
  <div>
    <div class="text-xs text-body font-bold mb-2">첨부 파일</div>
    <input
      class="hidden"
      type="file"
      id="file"
      multiple
      @change="handleFileUpload" />
    <RequestTaskFileInputAfter
      v-if="hasFiles"
      :files="modelValue"
      :removeFile="removeFile" />
    <div
      v-else
      class="w-full h-32 flex flex-col gap-4 items-center justify-center mt-2 rounded py-[31px] bg-white border-2 border-border-1 border-dashed">
      <div class="text-sm text-disabled font-bold">첨부할 파일을 끌어 놓으세요</div>
      <label
        for="file"
        class="button-medium-primary">
        <CommonIcons :name="uploadIcon" />
        <p>파일 선택</p>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommonIcons from '@/components/common/CommonIcons.vue'
import { uploadIcon } from '@/constants/iconPath'
import { computed } from 'vue'
import RequestTaskFileInputAfter from './RequestTaskFileInputAfter.vue'

const { modelValue } = defineProps<{
  modelValue: File[] | null
}>()
const emit = defineEmits(['update:modelValue'])

const hasFiles = computed(() => modelValue && modelValue.length > 0)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const newFiles = Array.from(target.files)
    const updatedFiles = modelValue ? [...modelValue, ...newFiles] : newFiles
    emit('update:modelValue', updatedFiles)
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
