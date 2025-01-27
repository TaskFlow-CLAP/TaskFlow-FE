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
        @click="router.push(`/edit-member/${info.memberId}`)"
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
    type="inputType"
    :is-open="isModalOpen.delete"
    @click="onMemberDelete(info.memberId)"
    @close="toggleModal('delete')">
    <template #header>회원을 삭제 하시겠습니까?</template>
    <template #body>삭제된 회원은 복구할 수 없습니다</template>
  </ModalView>

  <ModalView
    type="successType"
    :is-open="isModalOpen.invite"
    @close="toggleModal('invite')">
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

const roleContent = (role: Role) => {
  return role === 'USER' ? '사용자' : role === 'MANAGER' ? '담당자' : '관리자'
}

const { info } = defineProps<{ info: MemberManagementListData }>()
const myRequestTabList: ListCardProps[] = [
  { content: info.name, width: 60 },
  { content: info.nickName, width: 80 },
  { content: info.department, width: 80 },
  { content: info.departmentRole, width: 80 },
  { content: info.email },
  { content: roleContent(info.role), width: 60 },
  { content: info.permission ? '허용' : '', width: 60 },
  { content: info.registeredAt, width: 80 }
]

const router = useRouter()

const isModalOpen = ref({
  delete: false,
  invite: false
})
const toggleModal = (key: keyof typeof isModalOpen.value) => {
  isModalOpen.value[key] = !isModalOpen.value[key]
}

const onMemberDelete = (memberId: number) => {
  console.log(memberId)
  toggleModal('delete')
}

const onMemberInvite = (memberId: number) => {
  console.log(memberId)
  toggleModal('invite')
}
</script>
