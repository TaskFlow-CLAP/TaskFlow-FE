<template>
  <div class="relative">
    <div
      :class="[
        'w-full flex gap-1 px-4 py-3 border border-border-1 items-end rounded',
        { 'bg-background-2': !isPossible, 'bg-white': isPossible }
      ]">
      <textarea
        class="w-full h-20 focus:outline-none resize-none"
        :class="isPossible ? 'bg-white' : 'bg-background-2'"
        :placeholder="placeHolderText"
        v-model="messageText"
        :disabled="!isPossible"
        maxlength="200"
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
        class="cursor-pointer hover:bg-background-2 rounded p-1">
        <CommonIcons :name="clipIcon" />
      </label>
      <button
        type="button"
        class="hover:bg-background-2 rounded p-1">
        <CommonIcons
          :name="sendIcon"
          :style="{ fill: isSendable ? '#7879EB' : '#A1A1AA' }"
          @click="sendMessage" />
      </button>
    </div>
    <p class="absolute text-xs top-[calc(100%+4px)] w-full flex justify-end text-body">
      ({{ inputLength }}/{{ 254 }})
    </p>
  </div>
  <ModalView
    :is-open="isModalVisible"
    type="failType"
    @close="handleModal">
    <template #header>파일 전송을 실패했습니다</template>
    <template #body>최대 파일의 용량은 5mb까지 가능합니다</template>
  </ModalView>
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
import ModalView from '../common/ModalView.vue'

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
const isModalVisible = ref(false)

const isPossible = computed(
  () =>
    history.length !== 0 &&
    inputLength.value < 200 &&
    (info.value.role !== 'ROLE_USER' || info.value.nickname === requestorName)
)

const isSendable = computed(() => isPossible.value && messageText.value.trim() !== '')
const inputLength = computed(() => messageText.value.length)

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

const handleModal = () => {
  isModalVisible.value = !isModalVisible.value
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
  if (file.size > 5 * 1024 * 1024) {
    handleModal()
    target.value = ''
    return
  }

  const formData = new FormData()

  const normalizedFileName = file.name.normalize('NFC')
  const truncatedFileName = normalizedFileName.slice(0, 18)

  const renamedFile = new File([file], truncatedFileName, { type: file.type })
  formData.append('attachment', renamedFile)

  await postCommentAttachment(taskId, formData)
  queryClient.invalidateQueries({ queryKey: ['historyData', taskId] })
  target.value = ''
}
</script>
