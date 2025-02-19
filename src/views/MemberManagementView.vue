<template>
  <div class="list-view">
    <TitleBar title="회원 관리">
      <template #button>
        <button
          type="button"
          class="flex py-1 px-2 rounded hover:bg-background-2 items-center gap-1 text-xs font-semibold text-primary3"
          @click="createNewMember">
          새 회원 추가
        </button>
        <MemberManagementAddByCsv />
        <a
          :href="CSV_PATH"
          class="flex py-1 px-2 rounded hover:bg-background-2 items-center gap-1 text-xs font-semibold text-primary3"
          download>
          <CommonIcons :name="downloadIcon" />
          일괄추가 파일양식
        </a>
      </template>
    </TitleBar>

    <MemberManagementFilterBar />

    <MemberManagementList />
  </div>
</template>

<script setup lang="ts">
import CommonIcons from '@/components/common/CommonIcons.vue'
import TitleBar from '@/components/common/TitleBar.vue'
import MemberManagementAddByCsv from '@/components/member-management/MemberManagementAddByCsv.vue'
import MemberManagementFilterBar from '@/components/member-management/MemberManagementFilterBar.vue'
import MemberManagementList from '@/components/member-management/MemberManagementList.vue'
import { CSV_PATH } from '@/constants/admin'
import { downloadIcon } from '@/constants/iconPath'
import { useRouter } from 'vue-router'

const router = useRouter()
const createNewMember = () => {
  router.push('/user-registration')
}
</script>
