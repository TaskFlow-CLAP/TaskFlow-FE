//Top.vue
<template>
  <div
    class="flex justify-center w-full bg-white text-black py-3 px-[120px] border border-border-1">
    <div class="flex w-full justify-between items-center">
      <div class="flex justify-center items-center gap-2 h-full">
        <button
          v-show="isLogined"
          @click="isSideOpen = true">
          <CommonIcons :name="hamburgerIcon" />
        </button>
        <img src="/MainLogo.svg" />
      </div>
      <div class="flex-1 h-full"></div>
      <div
        v-show="isLogined"
        class="w-[10%] h-full flex items-center gap-6">
        <CommonIcons :name="notificationIcon" />
        <!-- 프로필 사진 API 필요 -->
        <div class="rounded-[50%] bg-zinc-100 p-5" />
      </div>
    </div>
  </div>
  <SideBar
    v-if="isSideOpen"
    @close="onCloseSide" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonIcons from './common/CommonIcons.vue'
import SideBar from './SideBar.vue'
import { hamburgerIcon, notificationIcon } from '../constants/iconPath'

// 로그인 정보 필요
const isSideOpen = ref(false)
const isLogined = ref(true)

const onCloseSide = () => {
  isSideOpen.value = false
}
</script>
