<template>
  <div
    ref="topbarRef"
    class="fixed w-full bg-white py-2 border-b border-border-1 z-50">
    <div class="max-w-[1200px] mx-auto px-6 flex w-full justify-between items-center relative">
      <div class="flex justify-center items-center gap-6 h-full">
        <button
          class="relative"
          type="button"
          v-if="isLogined"
          @click="onOpenSide">
          <CommonIcons :name="hamburgerIcon" />
          <span class="hidden-text">메뉴</span>
        </button>
        <button
          class="relative"
          type="button"
          @click="router.push('/')">
          <MainLogo />
          <span class="hidden-text">로고 버튼</span>
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
import { getNotifiCount } from '@/api/common'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useIsOverlayOpenStore } from '@/stores/isOverlayOpen'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { hamburgerIcon } from '../../constants/iconPath'
import CommonIcons from '../common/CommonIcons.vue'
import ImageContainer from '../common/ImageContainer.vue'
import MainLogo from '../common/MainLogo.vue'
import NotificationIcon from '../icons/NotificationIcon.vue'
import NotificationModal from './NotificationModal.vue'
import ProfileModal from './ProfileModal.vue'

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

const isOverlayOpenStore = useIsOverlayOpenStore()
const { isOverlayOpen, scrollbarWidth } = storeToRefs(isOverlayOpenStore)
const onCloseSide = () => {
  isSideOpen.value = false
  isOverlayOpenStore.setIsOverlayOpen(false)
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
  isOverlayOpenStore.setIsOverlayOpen(true)
  isSideOpen.value = !isSideOpen.value
}

const topbarRef = ref<HTMLElement | null>(null)
watch([isOverlayOpen, scrollbarWidth], ([isOverlayOpen, scrollbarWidth]) => {
  if (topbarRef.value) {
    topbarRef.value.style.paddingRight = isOverlayOpen ? `${scrollbarWidth}px` : '0px'
  }
})
</script>
