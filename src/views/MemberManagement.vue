<template>
  <div class="list-view">
    <TitleBar title="회원 관리">
      <template #button>
        <button
          class="flex items-center gap-1 text-xs font-bold text-primary1"
          @click="() => {}">
          <CommonIcons
            :name="plusIcon"
            :style="{ fill: '#7879EB' }" />
          파일로 일괄 추가
        </button>
        <button
          class="flex items-center gap-1 text-xs font-bold text-primary1"
          @click="createNewMember">
          <CommonIcons
            :name="plusIcon"
            :style="{ fill: '#7879EB' }" />
          새 회원 추가
        </button>
      </template>
    </TitleBar>

    <MemberManagementFilterBar />

    <MemberManagementList />
  </div>
</template>

<script setup lang="ts">
import CommonIcons from '@/components/common/CommonIcons.vue'
import TitleBar from '@/components/TitleBar.vue'
import MemberManagementFilterBar from '@/components/user-management/MemberManagementFilterBar.vue'
import MemberManagementList from '@/components/user-management/MemberManagementList.vue'
import { plusIcon } from '@/constants/iconPath'
import { useRouter } from 'vue-router'

const router = useRouter()
const createNewMember = () => {
  router.push('/new-member')
}
</script>
