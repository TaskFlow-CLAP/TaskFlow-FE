<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex z-50 justify-center"
    @click.self="closeModal">
    <ModalView
      :isOpen="isModalVisible"
      type="successType"
      @close="closeLogoutModal">
      <template #header> 로그아웃 되었습니다. </template>
    </ModalView>
    <div
      class="flex relative w-[1200px] h-[72px] bg-opacity-15"
      @click.self="closeModal">
      <div
        class="absolute w-60 bg-white right-6 top-[72px] rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div
          class="flex items-center justify-center relative px-6 py-8 border-b bg-primary2 border-border-2">
          <div class="flex flex-col items-center justify-center">
            <img
              v-if="imgUrl"
              class="rounded-full mb-6 w-24 h-24"
              :src="info.profileImageUrl"
              alt="프로필 이미지" />
            <div
              v-else
              class="w-24 h-24 bg-background-1 rounded-full mb-6" />
            <div>
              <div class="flex flex-col justify-center items-center w-[172px]">
                <p class="text-xs text-body font-bold">{{ name }}</p>

                <p class="text-black">{{ nickname }}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="handleEdit"
          type="button"
          class="flex w-full py-4 px-6 text-sm text-black font-bold border-b border-border-2">
          내 정보 수정
        </button>
        <button
          @click="handleLogout"
          type="button"
          class="flex w-full py-4 px-6 text-sm text-red-1 font-bold">
          로그아웃
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { deleteLogout } from '@/api/auth'
import ModalView from '../ModalView.vue'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const isModalVisible = ref(false)

const memberStore = useMemberStore()
const { isLogined, info } = storeToRefs(memberStore)

const imgUrl = computed(() => info.value.profileImageUrl)
const name = computed(() => info.value.name)
const nickname = computed(() => info.value.nickname)

const router = useRouter()

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}
const handleEdit = () => {
  router.push('/edit-information')
  emit('close')
}
const openLogoutModal = () => {
  isModalVisible.value = true
  isLogined.value = false
}
const closeLogoutModal = () => {
  isModalVisible.value = false
  emit('close')
  router.push('/login')
}

const handleLogout = () => {
  deleteLogout()
  openLogoutModal()
}
</script>
