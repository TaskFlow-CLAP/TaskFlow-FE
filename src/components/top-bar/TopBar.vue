<template>
  <div class="fixed w-full bg-white text-black py-2 border-b border-border-1 z-50">
    <div class="max-w-[1200px] mx-auto px-6 flex w-full justify-between items-center relative">
      <div class="flex justify-center items-center gap-6 h-full">
        <button
          type="button"
          v-if="isLogined"
          @click="isSideOpen = true">
          <CommonIcons :name="hamburgerIcon" />
        </button>
        <img src="/MainLogo.svg" />
      </div>
      <div
        v-if="isLogined"
        class="flex items-center gap-6">
        <div
          :key="isNotifiVisible + ''"
          ref="notifiRef"
          class="flex">
          <button
            type="button"
            @click="toggleNotifi">
            <NotificationIcon :new-notification="countNotifi" />
          </button>
          <NotificationModal
            :isOpen="isNotifiVisible"
            @close="toggleNotifi" />
        </div>
        <div
          ref="profileRef"
          class="flex">
          <button
            type="button"
            @click="toggleProfile">
            <img
              v-if="info?.profileImageUrl"
              class="rounded-[50%] w-10 h-10"
              :src="info.profileImageUrl"
              alt="프로필 이미지" />
            <div
              v-else
              class="rounded-[50%] bg-zinc-100 p-5" />
          </button>
          <ProfileModal
            :isOpen="isProfileVisible"
            @close="toggleProfile" />
        </div>
      </div>
    </div>
  </div>
  <SideBar
    v-if="isSideOpen"
    @close="onCloseSide" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import SideBar from './SideBar.vue'
import { hamburgerIcon } from '../../constants/iconPath'
import NotificationIcon from '../icons/NotificationIcon.vue'
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/stores/member'
import NotificationModal from './NotificationModal.vue'
import ProfileModal from './ProfileModal.vue'
import { getNotifiCount } from '@/api/common'
import { useRoute, useRouter } from 'vue-router'
import { PERMITTED_URL } from '@/constants/common'
import { useOutsideClick } from '../hooks/useOutsideClick'

const memberStore = useMemberStore()
const { isLogined, info } = storeToRefs(memberStore)

const route = useRoute()
const router = useRouter()
onMounted(async () => {
  await fetchNotificationCount()

  await memberStore.updateMemberInfoWithToken()

  const originUrl = route.path.split('/')[1]
  if (info.value.role === 'ROLE_USER') {
    if (!PERMITTED_URL.ROLE_USER.includes(originUrl)) router.push('/my-request')
  } else if (info.value.role === 'ROLE_MANAGER') {
    if (!PERMITTED_URL.ROLE_MANAGER.includes(originUrl)) router.push('/my-task')
  } else if (info.value.role === 'ROLE_ADMIN') {
    if (!PERMITTED_URL.ROLE_ADMIN.includes(originUrl)) router.push('/member-management')
  }
})

const isSideOpen = ref(false)
const countNotifi = ref(0)

const isNotifiVisible = ref(false)
const isProfileVisible = ref(false)

const fetchNotificationCount = async () => {
  if (!isLogined.value) return
  try {
    const data = await getNotifiCount()
    countNotifi.value = data.count
  } catch (error) {
    console.error('알림 개수 불러오기 실패:', error)
  }
}

const toggleNotifi = async () => {
  await fetchNotificationCount()
  isNotifiVisible.value = !isNotifiVisible.value
}
const toggleProfile = () => {
  isProfileVisible.value = !isProfileVisible.value
}

const onCloseSide = () => {
  isSideOpen.value = false
}

watch(
  () => info.value,
  async newInfo => {
    if (newInfo.name) {
      await fetchNotificationCount()
    }
  },
  { deep: true }
)

const { htmlRef: notifiRef } = useOutsideClick(() => isNotifiVisible.value && toggleNotifi())
const { htmlRef: profileRef } = useOutsideClick(() => isProfileVisible.value && toggleProfile())
</script>
