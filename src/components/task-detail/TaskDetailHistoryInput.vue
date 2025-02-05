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
      v-model="messageText"
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
      :style="{ fill: isSendable ? '#7879EB' : '#A1A1AA' }"
      @click="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { clipIcon, sendIcon } from '@/constants/iconPath'
import { useMemberStore } from '@/stores/member'
import type { TaskHistory } from '@/types/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { history, taskId } = defineProps<{ history: TaskHistory[]; taskId: number }>()
const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

import { postComment } from '@/api/user'
import { computed } from 'vue'

const isPossible = computed(() => history.length !== 0 && info.value.memberRole !== 'ROLE_USER')
const isSendable = computed(() => isPossible.value && messageText.value.trim() !== '')

const placeHolderText = computed(() =>
  isPossible.value ? '텍스트를 입력' : '요청 승인 후 작성할 수 있습니다'
)
const messageText = ref('')

const sendMessage = async () => {
  if (!isPossible.value || !messageText.value.trim()) {
    return
  }
  console.log(taskId, 'taskId', messageText.value)
  await postComment(taskId, messageText.value)
  messageText.value = ''
}
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    console.log('향후 파일 전송로직 추가')
  }
}
</script>
