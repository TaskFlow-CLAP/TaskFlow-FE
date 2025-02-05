<template>
  <div class="fixed w-full bg-white text-black py-2 border-b border-border-1">
    <div
      class="max-w-[1200px] min-w-[1024px] mx-auto px-6 flex w-full justify-between items-center">
      <div class="flex justify-center items-center gap-6 h-full">
        <button
          v-show="isLogined"
          @click="isSideOpen = true">
          <CommonIcons :name="hamburgerIcon" />
        </button>
        <img src="/MainLogo.svg" />
      </div>
      <div
        v-show="isLogined"
        class="flex items-center gap-6">
        <NotificationIcon :new-notification="12" />
        <img
          v-if="info?.imageUrl"
          class="rounded-[50%] w-10 h-10"
          :src="info.imageUrl"
          alt="프로필 이미지" />
        <div
          v-else
          class="rounded-[50%] bg-zinc-100 p-5" />
      </div>
    </div>
  </div>
  <SideBar
    v-if="isSideOpen"
    @close="onCloseSide" />
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { hamburgerIcon } from '../constants/iconPath'
import CommonIcons from './common/CommonIcons.vue'
import NotificationIcon from './icons/NotificationIcon.vue'
import SideBar from './top-bar/SideBar.vue'

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

onMounted(async () => {
  await memberStore.updateMemberInfoWithToken()
})

const isSideOpen = ref(false)
const isLogined = ref(true)

const onCloseSide = () => {
  isSideOpen.value = false
}
</script>
