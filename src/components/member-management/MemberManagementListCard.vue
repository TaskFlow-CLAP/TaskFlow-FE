<template>
  <div class="list-card !cursor-default">
    <ListCardTab
      v-for="tab in myRequestTabList"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :is-text-xs="tab.isTextXs"
      :profile-img="tab.profileImg"
      :is-status="tab.isStatus" />
    <div class="w-[180px] flex gap-2 justify-center items-center shrink-0">
      <button
        type="button"
        @click="router.push(`/user-update?id=${info.memberId}`)"
        class="button-medium-primary">
        수정
      </button>
      <button
        type="button"
        class="button-medium-red"
        @click="toggleModal('delete')">
        삭제
      </button>
      <button
        type="button"
        :class="
          info.memberStatus !== 'ACTIVE'
            ? 'button-medium-secondary'
            : 'button-medium-disabled !cursor-default'
        "
        @click="info.memberStatus !== 'ACTIVE' && onMemberInvite(info.memberId)">
        초대
      </button>
    </div>
  </div>

  <ModalView
    type="warningType"
    :is-open="isModalVisible.delete"
    @click="onMemberDelete(info.memberId)"
    @close="closeModal">
    <template #header>회원을 삭제 하시겠습니까?</template>
    <template #body>삭제된 회원은 복구할 수 없습니다</template>
  </ModalView>
  <ResultModal
    :type="resultModalType"
    :is-open="isModalVisible.result"
    :message="message"
    @close="closeModal" />
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { useMemberStore } from '@/stores/member'
import type { MemberManagementListData } from '@/types/admin'
import type { ListCardProps, Role } from '@/types/common'
import { axiosInstance } from '@/utils/axios'
import { formatDate } from '@/utils/date'
import { useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../common/ModalView.vue'
import ResultModal from '../common/ResultModal.vue'
import ListCardTab from '../lists/ListCardTab.vue'

const roleContent = (role: Role) => {
  return role === 'ROLE_USER' ? '사용자' : role === 'ROLE_MANAGER' ? '담당자' : '관리자'
}

const { info } = defineProps<{ info: MemberManagementListData }>()
const myRequestTabList: ListCardProps[] = [
  { content: info.name, width: 60 },
  { content: info.nickname, width: 80 },
  { content: info.departmentName, width: 80 },
  { content: info.departmentRole, width: 80 },
  { content: info.email },
  { content: roleContent(info.role), width: 60 },
  { content: info.isReviewer ? '허용' : '', width: 60 },
  { content: formatDate(info.createdAt), width: 80 }
]

const router = useRouter()
const queryClient = useQueryClient()

const isModalVisible = ref({
  delete: false,
  result: false
})
const resultModalType = ref('')
const message = ref('')
const memberStore = useMemberStore()
const { info: myInfo } = storeToRefs(memberStore)
const { setError } = useErrorStore()
const toggleModal = (key: keyof typeof isModalVisible.value) => {
  if (key === 'delete' && info.nickname === myInfo.value.nickname) {
    setError('자신의 계정은\n삭제할 수 없습니다')
    return
  }
  isModalVisible.value = Object.fromEntries(
    Object.keys(isModalVisible.value).map(k => [k, k === key])
  ) as typeof isModalVisible.value
}
const closeModal = () => {
  const prevSuccess = isModalVisible.value.result
  isModalVisible.value = { delete: false, result: false }
  if (prevSuccess) queryClient.invalidateQueries({ queryKey: ['member'] })
}

const onMemberDelete = async (memberId: number) => {
  try {
    await axiosInstance.delete(`/api/managements/members`, { data: { memberId } })
    resultModalType.value = 'successType'
    message.value = '회원을 삭제했습니다'
    toggleModal('result')
  } catch {
    resultModalType.value = 'failType'
    message.value = '회원의 잔여작업이 존재합니다'
    toggleModal('result')
  }
}

const onMemberInvite = async (memberId: number) => {
  try {
    await axiosInstance.post('/api/managements/members/invite', { memberId })
    resultModalType.value = 'successType'
    message.value = '초대 메일을 발송하였습니다'
    toggleModal('result')
  } catch {
    resultModalType.value = 'failType'
    message.value = '초대 메일 발송에 실패했습니다'
    toggleModal('result')
  }
}
</script>
