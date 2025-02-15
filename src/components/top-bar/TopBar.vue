<template>
  <div class="fixed w-full bg-white py-2 border-b border-border-1 z-50">
    <div class="max-w-[1200px] mx-auto px-6 flex w-full justify-between items-center relative">
      <div class="flex justify-center items-center gap-6 h-full">
        <button
          type="button"
          v-if="isLogined"
          @click="onOpenSide">
          <CommonIcons :name="hamburgerIcon" />
        </button>
        <button @click="router.push('/')">
          <img src="/MainLogo.svg" />
        </button>
      </div>
      <div
        v-if="isLogined"
        class="flex items-center gap-5">
        <div
          v-if="info.role !== 'ROLE_ADMIN'"
          :key="isNotifiVisible + ''"
          ref="notifiRef"
          class="flex">
          <button
            class="p-1 hover:bg-background-2 rounded"
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
            class="flex"
            @click="toggleProfile">
            <ImageContainer
              :url="info.profileImageUrl"
              :size="40" />
          </button>
          <ProfileModal
            :isOpen="isProfileVisible"
            @close="toggleProfile" />
        </div>
      </div>
    </div>
  </div>
  <SideBar
    :is-open="isSideOpen"
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
import ImageContainer from '../common/ImageContainer.vue'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useRouter } from 'vue-router'
import { useIsOverlayOpenStore } from '@/stores/isOverlayOpen'

const memberStore = useMemberStore()
const { isLogined, info } = storeToRefs(memberStore)
const router = useRouter()

onMounted(async () => {
  if (isLogined.value) {
    await fetchNotificationCount()
  }
})

const isSideOpen = ref(false)
const countNotifi = ref(0)

const isNotifiVisible = ref(false)
const isProfileVisible = ref(false)

const fetchNotificationCount = async () => {
  if (!info.value.role) return

  const data = await getNotifiCount()
  countNotifi.value = data.count
}

const toggleNotifi = async () => {
  await fetchNotificationCount()
  isNotifiVisible.value = !isNotifiVisible.value
}
const toggleProfile = () => {
  isProfileVisible.value = !isProfileVisible.value
}

const { setIsOverlayOpen } = useIsOverlayOpenStore()
const onCloseSide = () => {
  isSideOpen.value = false
  setIsOverlayOpen(false)
}

watch(
  () => info.value,
  async newInfo => {
    if (newInfo.role) {
      await fetchNotificationCount()
    }
  },
  { deep: true }
)

const { htmlRef: notifiRef } = useOutsideClick(() => isNotifiVisible.value && toggleNotifi())
const { htmlRef: profileRef } = useOutsideClick(() => isProfileVisible.value && toggleProfile())

const onOpenSide = () => {
  setIsOverlayOpen(true)
  isSideOpen.value = !isSideOpen.value
}
</script>
