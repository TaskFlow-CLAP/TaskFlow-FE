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
import { getNotifiCount } from '@/api/common'
import { useRoute, useRouter } from 'vue-router'
import { PERMITTED_URL } from '@/constants/common'

const memberStore = useMemberStore()
const { isLogined, info } = storeToRefs(memberStore)

const route = useRoute()
const router = useRouter()
onMounted(async () => {
  await fetchNotificationCount()

  await memberStore.updateMemberInfoWithToken()

  const originUrl = route.path.split('/')[1]
  if (info.value.memberRole === 'ROLE_USER') {
    if (!PERMITTED_URL.ROLE_USER.includes(originUrl)) router.push('/my-request')
  } else if (info.value.memberRole === 'ROLE_MANAGER') {
    if (!PERMITTED_URL.ROLE_MANAGER.includes(originUrl)) router.push('/my-task')
  } else if (info.value.memberRole === 'ROLE_ADMIN') {
    if (!PERMITTED_URL.ROLE_ADMIN.includes(originUrl)) router.push('/member-management')
  } else {
    if (!PERMITTED_URL.UNKNOWN.includes(originUrl)) {
      router.push('/login')
    }
  }
})

const isSideOpen = ref(false)
const countNotifi = ref(0)

const isNotifiVisible = ref(false)
const isProfileVisible = ref(false)

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
