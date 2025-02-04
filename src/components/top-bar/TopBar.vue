<template>
  <NotificationModal
    :isOpen="isNotifiVisible"
    @close="toggleNotifi" />
  <ProfileModal
    :isOpen="isProfileVisible"
    @close="toggleProfile" />
  <div class="fixed w-full bg-white text-black py-2 border-b border-border-1">
    <div
      class="max-w-[1200px] min-w-[1024px] mx-auto px-6 flex w-full justify-between items-center">
      <div class="flex justify-center items-center gap-6 h-full">
        <button
          type="button"
          v-show="isLogined"
          @click="isSideOpen = true">
          <CommonIcons :name="hamburgerIcon" />
        </button>
        <img src="/MainLogo.svg" />
      </div>
      <div
        v-show="isLogined"
        class="flex items-center gap-6">
        <button
          type="button"
          @click="toggleNotifi">
          <NotificationIcon :new-notification="12" />
        </button>
        <button
          type="button"
          @click="toggleProfile">
          <img
            v-if="info?.imageUrl"
            class="rounded-[50%] w-10 h-10"
            :src="info.imageUrl"
            alt="프로필 이미지" />
          <div
            v-else
            class="rounded-[50%] bg-zinc-100 p-5" />
        </button>
      </div>
    </div>
  </div>
  <SideBar
    v-if="isSideOpen"
    @close="onCloseSide" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import SideBar from './SideBar.vue'
import { hamburgerIcon } from '../../constants/iconPath'
import NotificationIcon from '../icons/NotificationIcon.vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import NotificationModal from './NotificationModal.vue'
import ProfileModal from './ProfileModal.vue'

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

onMounted(async () => {
  await memberStore.updateMemberInfoWithToken()
})

const isSideOpen = ref(false)
const isLogined = ref(true)

const isNotifiVisible = ref(false)
const isProfileVisible = ref(false)

const toggleNotifi = () => {
  isNotifiVisible.value = !isNotifiVisible.value
}
const toggleProfile = () => {
  isProfileVisible.value = !isProfileVisible.value
}

const onCloseSide = () => {
  isSideOpen.value = false
}
</script>
