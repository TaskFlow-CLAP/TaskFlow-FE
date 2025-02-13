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
        :class="userInfo.isReviewer ? 'button-medium-primary' : 'button-medium-disabled'">
        승인
      </button>
      <button
        type="button"
        @click.stop="userInfo.isReviewer && toggleModal('reject')"
        :class="userInfo.isReviewer ? 'button-medium-default' : 'button-medium-disabled'">
        반려
      </button>
    </div>
  </div>
  <TaskDetail
    v-if="selectedID"
    :selected-id="selectedID"
    :close-task-detail="() => handleModal(null)" />
  <ModalView
    :is-open="isModalVisible.reject"
    @update:model-value="value => (rejectReason = value || '')"
    type="inputType"
    @close="closeModal"
    @click="rejectRequest">
    <template #header>반려 사유를 입력해주세요</template>
  </ModalView>
  <ModalView
    :is-open="isModalVisible.success"
    type="successType"
    @close="closeModal">
    <template #header>반려가 완료되었습니다</template>
  </ModalView>
  <ModalView
    :is-open="isModalVisible.fail"
    type="failType"
    @close="closeModal">
    <template #header>{{ modalError }}</template>
  </ModalView>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/member'
import type { ListCardProps } from '@/types/common'
import type { RequestedListData } from '@/types/manager'
import { axiosInstance } from '@/utils/axios'
import { formatDate } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../common/ModalView.vue'
import ListCardTab from '../lists/ListCardTab.vue'
import TaskDetail from '../task-detail/TaskDetail.vue'

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
    modalError.value = '반려 사유를 입력해주세요'
    return
  }
  await axiosInstance.patch(`/api/tasks/${info.taskId}/terminate`, { reason: rejectReason.value })
  toggleModal('success')
}

const { info: userInfo } = useMemberStore()
</script>
