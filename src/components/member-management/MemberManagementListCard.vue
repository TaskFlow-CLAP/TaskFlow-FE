<template>
  <div class="list-card">
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
        @click="router.push(`/user-update`)"
        class="button-medium-primary">
        수정
      </button>
      <button
        class="button-medium-red"
        @click="toggleModal('delete')">
        삭제
      </button>
      <button
        class="button-medium-secondary"
        @click="onMemberInvite(info.memberId)">
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
  <ModalView
    type="failType"
    :is-open="isModalVisible.fail"
    @close="closeModal">
    <template #header>회원 삭제에 실패했습니다</template>
  </ModalView>
  <ModalView
    type="successType"
    :is-open="isModalVisible.success"
    @close="closeModal">
    <template #header>회원을 삭제했습니다</template>
  </ModalView>

  <ModalView
    type="successType"
    :is-open="isModalVisible.invite"
    @close="closeModal">
    <template #header>초대 메일을 발송하였습니다</template>
  </ModalView>
</template>

<script setup lang="ts">
import type { ListCardProps, Role } from '@/types/common'
import ListCardTab from '../lists/ListCardTab.vue'
import type { MemberManagementListData } from '@/types/admin'
import { useRouter } from 'vue-router'
import ModalView from '../ModalView.vue'
import { ref } from 'vue'
import axiosInstance from '@/utils/axios'
import { useQueryClient } from '@tanstack/vue-query'

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
  { content: info.registeredAt, width: 80 }
]

const router = useRouter()
const queryClient = useQueryClient()

const isModalVisible = ref({
  delete: false,
  invite: false,
  fail: false,
  success: false
})
const toggleModal = (key: keyof typeof isModalVisible.value) => {
  isModalVisible.value = Object.fromEntries(
    Object.keys(isModalVisible.value).map(k => [k, k === key])
  ) as typeof isModalVisible.value
}
const closeModal = () => {
  const prevSuccess = isModalVisible.value.success
  isModalVisible.value = { delete: false, invite: false, fail: false, success: false }
  if (prevSuccess) queryClient.invalidateQueries({ queryKey: ['member'] })
}

const onMemberDelete = async (memberId: number) => {
  try {
    await axiosInstance.patch(`/api/managements/members/${memberId}`)
    toggleModal('success')
  } catch {
    toggleModal('fail')
  }
}

const onMemberInvite = (memberId: number) => {
  console.log(memberId)
  toggleModal('invite')
}
</script>
