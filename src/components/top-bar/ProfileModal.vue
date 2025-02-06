<template>
  <div
    v-if="isOpen"
    @click.stop
    class="absolute w-60 bg-white right-6 top-[calc(100%+16px)] rounded-lg shadow-custom overflow-hidden">
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
      class="flex w-full py-4 px-6 text-sm text-black font-bold border-b border-border-2 hover:bg-background-2">
      내 정보 수정
    </button>
    <button
      @click="handleLogout"
      type="button"
      class="flex w-full py-4 px-6 text-sm text-red-1 font-bold hover:bg-background-2">
      로그아웃
    </button>
  </div>
  <ModalView
    :isOpen="isModalVisible"
    type="successType"
    @close="closeLogoutModal">
    <template #header> 로그아웃 되었습니다. </template>
  </ModalView>
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
const { info } = storeToRefs(memberStore)

const imgUrl = computed(() => info.value.profileImageUrl)
const name = computed(() => info.value.name)
const nickname = computed(() => info.value.nicknanme)

const router = useRouter()

const { isOpen } = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleEdit = () => {
  router.push('/edit-information')
  emit('close')
}
const openLogoutModal = () => {
  isModalVisible.value = true
}
const closeLogoutModal = () => {
  isModalVisible.value = false
  memberStore.isLogined = false
  router.push('/login')
}

const handleLogout = async () => {
  deleteLogout()
  openLogoutModal()
  emit('close')
}
</script>
