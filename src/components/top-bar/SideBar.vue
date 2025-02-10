<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-15 flex items-center z-50"
    @click.self="$emit('close')" />
  <Transition name="sidebar">
    <div
      v-if="isOpen"
      class="flex flex-col fixed w-80 bg-white h-screen shadow-custom py-2 z-50">
      <div class="flex flex-col gap-12 flex-1 overflow-hidden">
        <div class="flex justify-between items-center px-6">
          <CommonIcons
            @click="$emit('close')"
            class="cursor-pointer"
            :name="hamburgerIcon" />
          <img src="/MainLogo.svg" />
        </div>
        <div class="flex-1 overflow-y-auto flex flex-col gap-6">
          <div
            v-for="menuGroup in filteredMenu"
            :key="menuGroup.groupId">
            <span class="flex text-xs text-disabled font-bold px-6 py-2">
              {{ menuGroup.groupTitle }}
            </span>
            <div
              v-for="menuItem in menuGroup.items"
              :key="menuItem.menuId">
              <RouterLink
                :to="menuItem.link"
                class="flex items-center w-full h-[52px] hover:bg-background-2"
                :class="
                  menuItem.link === route.path
                    ? 'px-4 border-l-8 border-primary1 font-bold'
                    : 'px-6'
                "
                @click="$emit('close')">
                {{ menuItem.content }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full justify-between px-6 py-4 bg-white">
        <div class="flex w-full items-center gap-3">
          <ImageContainer
            :url="info.profileImageUrl"
            :size="40" />
          <div class="flex flex-col gap-1">
            <p class="text-xs text-body font-bold">{{ name }}</p>
            <p class="text-sm">{{ nickname }}</p>
          </div>
        </div>
        <div class="flex items-end whitespace-nowrap">
          <RouterLink
            to="/edit-information"
            class="text-primary1 text-sm font-bold"
            @click="$emit('close')">
            내 정보 수정
          </RouterLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import { hamburgerIcon } from '@/constants/iconPath'
import { SIDE_USER_MENU, SIDE_MANAGER_MENU, SIDE_ADMIN_MENU } from '@/constants/menu'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import ImageContainer from '../common/ImageContainer.vue'

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const { isOpen } = defineProps<{ isOpen: boolean }>()
defineEmits(['close'])

const route = useRoute()

const role = computed(() => info.value.role)
const name = computed(() => info.value.name)
const nickname = computed(() => info.value.nickname)

const filteredMenu = computed(() => {
  return role.value === 'ROLE_USER'
    ? SIDE_USER_MENU
    : role.value === 'ROLE_MANAGER'
      ? SIDE_MANAGER_MENU
      : SIDE_ADMIN_MENU
})
</script>
