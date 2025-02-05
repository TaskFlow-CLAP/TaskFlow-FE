<template>
  <div class="list-card">
    <ListCardTab
      v-for="tab in requestedTabList"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :is-text-xs="tab.isTextXs"
      :profile-img="tab.profileImg"
      :is-status="tab.isStatus" />
    <div class="w-[120px] flex gap-2 justify-center items-center shrink-0">
      <button
        @click="router.push(`/request-approve?requestId=${info.taskId}`)"
        class="button-medium-primary">
        승인
      </button>
      <button
        @click="toggleModal('reject')"
        class="button-medium-default">
        거부
      </button>
      <button
        @click="toggleModal('reject')"
        class="button-medium-default">
        거부
      </button>
    </div>
  </div>

  <ModalView
    :is-open="isModalVisible.reject"
    @update:model-value="value => (rejectReason = value)"
    type="inputType"
    @close="closeModal"
    @click="rejectRequest">
    <template #header>거부 사유를 입력해주세요</template>
  </ModalView>
  <ModalView
    :is-open="isModalVisible.success"
    type="successType"
    @close="closeModal">
    <template #header>거부가 완료되었습니다</template>
  </ModalView>
  <ModalView
    :is-open="isModalVisible.fail"
    type="failType"
    @close="closeModal">
    <template #header>{{ modalError }}</template>
  </ModalView>
</template>

<script setup lang="ts">
import type { ListCardProps } from '@/types/common'
import type { RequestedListData } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { formatDate } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ListCardTab from '../lists/ListCardTab.vue'
import ModalView from '../ModalView.vue'

const { info } = defineProps<{ info: RequestedListData }>()
const requestedTabList: ListCardProps[] = [
  { content: formatDate(info.requestedAt), width: 80 },
  { content: info.mainCategoryName, width: 80 },
  { content: info.categoryName, width: 80 },
  { content: info.title },
  { content: info.requesterName, width: 120, profileImg: info.requesterImg }
]

const router = useRouter()
const queryClient = useQueryClient()

const isModalVisible = ref({
  reject: false,
  fail: false,
  success: false
})
const modalError = ref('')
const rejectReason = ref('')
const toggleModal = (key: keyof typeof isModalVisible.value) => {
  isModalVisible.value = Object.fromEntries(
    Object.keys(isModalVisible.value).map(k => [k, k === key])
  ) as typeof isModalVisible.value
}
const closeModal = () => {
  const prevSuccess = isModalVisible.value.success
  isModalVisible.value = { reject: false, fail: false, success: false }
  if (prevSuccess) queryClient.invalidateQueries({ queryKey: ['requested'] })
}
const rejectRequest = async () => {
  if (rejectReason.value.length === 0) {
    toggleModal('fail')
    modalError.value = '거부 사유를 입력해주세요'
    return
  }
  try {
    await axiosInstance.patch(`/api/tasks/${info.taskId}/terminate`, rejectReason)
    toggleModal('success')
  } catch {
    toggleModal('fail')
    modalError.value = '작업 거부에 실패했습니다'
  }
}
</script>
