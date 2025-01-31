<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-15 flex items-center z-50"
    @click.self="$emit('close')">
    <div class="flex flex-col relative w-80 bg-white h-screen shadow-lg shadow-black">
      <div class="flex justify-between items-center my-3 h-[48px] px-6">
        <div>
          <CommonIcons :name="hamburgerIcon" />
        </div>
        <div>
          <img src="/MainLogo.svg" />
        </div>
      </div>
      <div class="flex-1 min-h-0 overflow-y-auto">
        <div
          v-for="menuGroup in filteredMenu"
          :key="menuGroup.groupId">
          <div
            v-for="menuItem in menuGroup.items"
            :key="menuItem.menuId"
            class="flex">
            <div :class="['px-1', { 'bg-primary1': menuItem.link === route.path }]" />
            <RouterLink
              v-if="menuItem.link"
              :to="menuItem.link"
              :class="['flex py-4 px-6 text-black', { 'font-bold': menuItem.link === route.path }]">
              {{ menuItem.content }}
            </RouterLink>
            <span
              v-else
              class="text-xs text-disabled font-bold px-6 pt-8 pb-2">
              {{ menuItem.content }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex w-full px-6 bg-white py-6">
        <div class="flex items-center max-w-[140px]">
          <!-- 프로필 사진 API 필요 -->
          <div class="w-[40px] h-[40px] rounded-full bg-zinc-100" />
          <div class="px-3">
            <p class="text-xs text-body font-bold">{{ name }}</p>
            <p class="text-sm text-black">{{ nickname }}</p>
          </div>
        </div>
        <div class="flex items-end justify-end w-full">
          <RouterLink
            to="/"
            class="text-primary1 text-sm font-bold"
            >내 정보 수정</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import CommonIcons from './common/CommonIcons.vue'
import { hamburgerIcon } from '@/constants/iconPath'
import { SIDE_USER_MENU, SIDE_MANAGER_MENU, SIDE_ADMIN_MENU } from '@/constants/menu'

const route = useRoute()

// 회원 역할, 닉네임 필요
const role = ref('manager')
const name = ref('백지연')
const nickname = ref('Chloe.yeon')

const filteredMenu = computed(() => {
  return role.value === 'user'
    ? SIDE_USER_MENU
    : role.value === 'manager'
      ? SIDE_MANAGER_MENU
      : SIDE_ADMIN_MENU
})
</script>

<style scoped></style>
