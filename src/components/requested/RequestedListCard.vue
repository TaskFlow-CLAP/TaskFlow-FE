<template>
  <div
    class="list-card"
    @click="handleModal(info.taskId)">
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
        type="button"
        @click.stop="
          userInfo.isReviewer && router.push(`/request-approve?requestId=${info.taskId}`)
        "
        :class="
          userInfo.isReviewer
            ? 'button-medium-primary'
            : 'button-medium text-disabled bg-background-1'
        ">
        승인
      </button>
      <button
        type="button"
        @click.stop="userInfo.isReviewer && toggleModal('reject')"
        :class="
          userInfo.isReviewer
            ? 'button-medium-primary'
            : 'button-medium text-disabled bg-background-1'
        ">
        거부
      </button>
    </div>
  </div>
  <TaskDetail
    v-if="selectedID"
    :is-approved="true"
    :selected-id="selectedID"
    :close-task-detail="() => handleModal(null)" />

  <ModalView
    :is-open="isModalVisible.reject"
    @update:model-value="value => (rejectReason = value || '')"
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
import TaskDetail from '../task-detail/TaskDetail.vue'
import { useMemberStore } from '@/stores/member'

const { info } = defineProps<{ info: RequestedListData }>()
const requestedTabList: ListCardProps[] = [
  { content: formatDate(info.requestedAt), width: 80 },
  { content: info.mainCategoryName, width: 80 },
  { content: info.categoryName, width: 80 },
  { content: info.title },
  { content: info.requesterName, width: 120, profileImg: info.requesterImg }
]

const selectedID = ref<number | null>(null)

const handleModal = (id: number | null) => {
  if (id) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
  selectedID.value = id
}

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
  document.body.style.overflow = 'hidden'
  isModalVisible.value = Object.fromEntries(
    Object.keys(isModalVisible.value).map(k => [k, k === key])
  ) as typeof isModalVisible.value
}
const closeModal = () => {
  document.body.style.overflow = ''
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

const { info: userInfo } = useMemberStore()
</script>
