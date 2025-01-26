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
      <button class="button-medium-red">삭제</button>
      <button class="button-medium-secondary">초대</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ListCardProps, Role } from '@/types/common'
import ListCardTab from '../lists/ListCardTab.vue'
import type { MemberManagementListData } from '@/types/admin'
import { useRouter } from 'vue-router'

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
</script>
