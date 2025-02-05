<template>
  <div
    :class="[
      'w-full flex gap-3 px-4 py-3 border border-border-1 items-end rounded',
      { 'bg-background-2': !isPossible, 'bg-white': isPossible }
    ]">
    <textarea
      class="w-full h-20 focus:outline-none resize-none"
      type="text"
      :placeholder="placeHolderText"
      :disabled="!isPossible"></textarea>
    <input
      class="hidden"
      type="file"
      id="file"
      :disabled="!isPossible"
      multiple
      @change="handleFileUpload" />
    <label
      for="file"
      class="cursor-pointer">
      <CommonIcons :name="clipIcon" />
    </label>
    <CommonIcons
      :name="sendIcon"
      class="cursor-pointer"
      :style="{ fill: isPossible ? '#7879EB' : '#A1A1AA' }" />
  </div>
</template>

<script setup lang="ts">
import { clipIcon, sendIcon } from '@/constants/iconPath'
import { useMemberStore } from '@/stores/member'
import type { TaskHistory } from '@/types/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { history } = defineProps<{ history: TaskHistory[] }>()
const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const isPossible = ref(history.length !== 0 && info.value.memberRole !== 'ROLE_USER')
const placeHolderText = ref(isPossible?.value ? '텍스트를 입력' : '요청 승인 후 작성할 수 있습니다')

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    console.log('향후 파일 전송로직 추가')
  }
}
</script>
