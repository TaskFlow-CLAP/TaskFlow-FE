<template>
  <div class="list-view">
    <TitleBar title="내 요청">
      <template #button>
        <button
          type="button"
          class="flex items-center gap-1 py-1 px-2 rounded hover:bg-background-2 text-xs font-semibold text-primary3"
          @click="createNewRequest">
          <CommonIcons
            :name="plusIcon"
            :style="{ fill: '#7879EB' }" />
          새 요청 생성
        </button>
      </template>
    </TitleBar>

    <MyRequestFilterBar />

    <MyRequestList />
  </div>
</template>

<script setup lang="ts">
import CommonIcons from '@/components/common/CommonIcons.vue'
import TitleBar from '@/components/common/TitleBar.vue'
import MyRequestFilterBar from '@/components/my-request/MyRequestFilterBar.vue'
import MyRequestList from '@/components/my-request/MyRequestList.vue'
import { plusIcon } from '@/constants/iconPath'
import { useRouter } from 'vue-router'

const router = useRouter()
const createNewRequest = () => {
  router.push('/task-request')
}
</script>

<style scoped></style>
