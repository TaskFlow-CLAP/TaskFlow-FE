<template>
  <div>
    <div class="w-full h-32 border border-border-1 rounded">
      <div
        class="flex w-full justify-between items-center h-6 text-[10px] text-body font-semibold bg-border-2 border-b border-b-border-1 px-4">
        <p class="w-7">파일명</p>
        <div class="flex gap-6">
          <p class="w-[60px]">용량</p>
          <p class="w-36">최종 업로드 시각</p>
          <p class="w-10">파일삭제</p>
        </div>
      </div>
      <div
        v-if="files && files.length > 0"
        class="flex flex-col h-[102px] overflow-hidden overflow-y-auto scrollbar-hide">
        <div
          v-for="(file, index) in files"
          :key="file.name"
          class="flex w-full justify-between items-center h-8 text-xs border-b border-b-border-2 px-4 shrink-0">
          <p class="flex truncate mr-3">{{ file.name }}</p>
          <div class="flex gap-6">
            <p class="w-[60px]">{{ formatFileSize(file.size) }}</p>
            <p class="w-36">{{ new Date().toLocaleString() }}</p>
            <div class="w-10 flex items-center justify-center cursor-pointer">
              <CommonIcons
                :name="deleteIcon"
                @click="removeFile(index)" />
            </div>
          </div>
        </div>
        <label
          for="file"
          class="w-full h-8 flex items-center justify-center text-primary1 font-semibold gap-1 text-xs cursor-pointer shrink-0">
          <CommonIcons
            :name="plusIcon"
            :style="{ fill: '#7879eb' }" />
          <p>파일 선택</p>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deleteIcon, plusIcon } from '@/constants/iconPath'
import type { RequestTaskFileInputProps } from '@/types/user'
import { formatFileSize } from '@/utils/unit'
import CommonIcons from '../common/CommonIcons.vue'

const { files, removeFile } = defineProps<RequestTaskFileInputProps>()
</script>
