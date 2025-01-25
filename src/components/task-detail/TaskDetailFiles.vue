<template>
  <div class="w-full h-32 border border-border-1 rounded">
    <div
      class="flex w-full justify-between items-center h-6 text-[10px] text-body font-bold bg-border-2 border-b border-b-border-1 px-4">
      <p class="w-7">파일명</p>
      <div class="flex gap-6">
        <p class="w-[60px]">용량</p>
        <p class="w-36">최종 업로드 시각</p>
        <p class="w-10">다운로드</p>
      </div>
    </div>
    <div
      v-if="files && files.length > 0"
      class="flex flex-col h-[102px] overflow-hidden overflow-y-auto">
      <div
        v-for="file in files"
        :key="file.fileName"
        class="flex w-full justify-between items-center h-8 text-xs border-b border-b-border-2 text-black px-4 shrink-0">
        <p class="flex truncate mr-3">{{ file.fileName }}</p>
        <div class="flex gap-6">
          <p class="w-[60px]">{{ formatFileSize(Number(file.fileSize)) }}</p>
          <p class="w-36">{{ new Date().toLocaleString() }}</p>
          <div class="w-10 flex items-center justify-center cursor-pointer">
            <CommonIcons
              class="cursor-pointer"
              :name="downloadIcon"
              @click="downloadFile(file)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { downloadIcon } from '@/constants/iconPath'
import type { AttachmentResponse } from '@/types/user'
import { formatFileSize } from '@/utils/unit'
import CommonIcons from '../common/CommonIcons.vue'

const { files } = defineProps<{ files: AttachmentResponse[] }>()
const downloadFile = (file: AttachmentResponse) => {
  console.log('향후 파일 다운 로직 추가', file)
}
</script>
