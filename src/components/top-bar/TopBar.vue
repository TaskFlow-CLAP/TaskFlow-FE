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
          <NotificationIcon :new-notification="countNotifi" />
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
import Cookies from 'js-cookie'
import { getNotifiCount } from '@/api/common'

const memberStore = useMemberStore()
const { isLogined, info } = storeToRefs(memberStore)
const accessToken = Cookies.get('accessToken')
const isSideOpen = ref(false)
const countNotifi = ref(0)

const isNotifiVisible = ref(false)
const isProfileVisible = ref(false)

onMounted(async () => {
  if (accessToken) {
    await memberStore.updateMemberInfoWithToken()
  }
  await fetchNotificationCount()
})

const fetchNotificationCount = async () => {
  try {
    const data = await getNotifiCount()
    countNotifi.value = data.count // 🔹 count 값만 저장
  } catch (error) {
    console.error('알림 개수 불러오기 실패:', error)
  }
}

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
