<template>
  <div>
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
        v-if="props.files && props.files.length > 0"
        class="flex flex-col h-[102px] overflow-hidden overflow-y-auto">
        <div
          v-for="(file, index) in props.files"
          :key="index"
          class="flex w-full justify-between items-center h-8 text-xs border-b border-b-border-2 text-black px-4 shrink-0">
          <p class="flex truncate mr-3">{{ file.name }}</p>
          <div class="flex gap-6">
            <p class="w-[60px]">{{ formatFileSize(file.size) }}</p>
            <p class="w-36">{{ new Date().toLocaleString() }}</p>
            <div class="w-10 flex items-center justify-center cursor-pointer">
              <CommonIcons
                :name="deleteIcon"
                @click="props.removeFile(index)" />
            </div>
          </div>
        </div>
        <label
          for="file"
          class="w-full h-8 flex items-center justify-center text-primary1 font-bold gap-1 text-xs cursor-pointer shrink-0">
          <CommonIcons
            :name="plusIcon"
            :style="{ fill: '#7879eb' }" />
          <p>파일선택</p>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deleteIcon, plusIcon } from '@/constants/iconPath'
import { formatFileSize } from '@/utils/unit'
import CommonIcons from './CommonIcons.vue'

const props = defineProps<{
  files: File[] | null
  removeFile: (index: number) => void
}>()
</script>
