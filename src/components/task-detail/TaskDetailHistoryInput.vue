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
      :disabled="!isPossible"
      @compositionstart="isComposing = true"
      @compositionend="isComposing = false"
      @keyup.enter.prevent="handleEnterKey"></textarea>
    <input
      class="hidden"
      type="file"
      id="file"
      :disabled="!isPossible"
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
import { postComment, postCommentAttachment } from '@/api/user'
import { clipIcon, sendIcon } from '@/constants/iconPath'
import { useMemberStore } from '@/stores/member'
import type { TaskHistory } from '@/types/user'
import { useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { history, taskId } = defineProps<{ history: TaskHistory[]; taskId: number }>()
const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)
const queryClient = useQueryClient()

const messageText = ref('')
const isComposing = ref(false)

const isPossible = computed(() => history.length !== 0 && info.value.memberRole !== 'ROLE_USER')
const isSendable = computed(() => isPossible.value && messageText.value.trim() !== '')
const placeHolderText = computed(() =>
  isPossible.value ? '텍스트를 입력' : '요청 승인 후 작성할 수 있습니다'
)

const sendMessage = async () => {
  if (!isPossible.value || !messageText.value.trim()) return

  await postComment(taskId, messageText.value)
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
  messageText.value = ''
}

const handleEnterKey = () => {
  if (!isComposing.value) {
    sendMessage()
  }
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('attachment', file)
  await postCommentAttachment(taskId, formData)
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
  target.value = ''
}
</script>
