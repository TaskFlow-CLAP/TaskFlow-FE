<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-15 flex items-center z-50"
    @click.self="$emit('close')">
    <div class="w-80 bg-white h-screen shadow-lg shadow-black">
      <div class="flex justify-center items-center gap-28 py-3 h-[10%]">
        <div>
          <CommonIcons
            class=""
            :name="hamburgerIcon" />
        </div>
        <div>
          <img src="../../public/MainLogo.svg" />
        </div>
      </div>
      <div class="h-[80%]">
        <div
          v-for="menuGroup in filteredMenu"
          :key="menuGroup[0].menuId">
          <div
            v-for="menuItem in menuGroup"
            :key="menuItem.menuId"
            class="flex">
            <div :class="['px-1', { 'bg-primary1': menuItem.link === route.path }]" />
            <RouterLink
              v-if="menuItem.link"
              :to="menuItem.link"
              :class="['flex py-4 px-6', { 'font-bold': menuItem.link === route.path }]">
              {{ menuItem.content }}
            </RouterLink>
            <span
              v-else
              class="text-xs text-zinc-400 font-bold px-6"
              >{{ menuItem.content }}</span
            >
          </div>
        </div>
      </div>
      <div class="flex w-full h-[10%] py-4 px-6">
        <div class="flex items-center max-w-[140px]">
          <div class="w-[40px] h-[40px] rounded-full bg-zinc-100" />
          <div class="px-3">
            <p class="text-xs">{{ name }}</p>
            <p class="text-sm">{{ nickname }}</p>
          </div>
        </div>
        <div class="flex items-end justify-end w-full py-1">
          <RouterLink
            to="/"
            class="text-primary1 text-sm"
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
