<template>
  <div
    :class="[
      'w-full flex gap-3 px-4 py-3 border border-border-1 items-end rounded',
      { 'bg-background-2': !isPossible, 'bg-white': isPossible }
    ]">
    <textarea
      class="w-full h-20 focus:outline-none resize-none"
      :placeholder="placeHolderText"
      v-model="messageText"
      :disabled="!isPossible"
      maxlength="254"
      @compositionstart="isComposing = true"
      @compositionend="isComposing = false"
      @keydown.enter.stop.prevent="handleEnterKey"></textarea>
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

const { history, taskId, requestorName } = defineProps<{
  history: TaskHistory[]
  taskId: number
  requestorName: string
}>()
const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)
const queryClient = useQueryClient()

const messageText = ref('')
const isComposing = ref(false)

const isPossible = computed(
  () =>
    history.length !== 0 &&
    (info.value.role !== 'ROLE_USER' || info.value.nickname === requestorName)
)

const isSendable = computed(() => isPossible.value && messageText.value.trim() !== '')

const placeHolderText = computed(() => {
  if (history.length === 0) {
    return '요청 승인 후 작성할 수 있습니다'
  } else if (info.value.role === 'ROLE_USER' && info.value.nickname !== requestorName) {
    return '작성 권한이 없습니다'
  } else {
    return '텍스트를 입력'
  }
})

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
