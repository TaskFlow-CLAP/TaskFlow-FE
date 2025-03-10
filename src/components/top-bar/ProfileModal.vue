<template>
  <div
    v-if="isOpen"
    @click.stop
    class="absolute w-52 bg-white right-6 top-[calc(100%+16px)] rounded-lg shadow-custom overflow-hidden">
    <div
      class="flex items-center justify-center relative px-6 pt-8 pb-6 border-b bg-primary2 border-border-2">
      <div class="flex flex-col items-center justify-center gap-6">
        <ImageContainer
          :url="info.profileImageUrl"
          :size="96" />
        <div>
          <div class="flex flex-col justify-center items-center w-full">
            <p class="text-xs text-body font-semibold">{{ name }}</p>

            <p>{{ nickname }}</p>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="handleEdit"
      type="button"
      class="flex w-full py-3.5 px-6 text-sm border-b border-border-2 hover:bg-background-2">
      내 정보 수정
    </button>
    <button
      @click="handleLogout"
      type="button"
      class="flex w-full py-3.5 px-6 text-sm text-red-1 font-semibold hover:bg-background-2">
      로그아웃
    </button>
  </div>
  <ModalView
    :isOpen="isModalVisible"
    type="successType"
    @close="closeLogoutModal">
    <template #header>로그아웃 되었습니다</template>
  </ModalView>
</template>

<script setup lang="ts">
import { deleteLogout } from '@/api/auth'
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ImageContainer from '../common/ImageContainer.vue'
import ModalView from '../common/ModalView.vue'

const isModalVisible = ref(false)

const memberStore = useMemberStore()
const { isLogined, info } = storeToRefs(memberStore)

const name = computed(() => info.value.name)
const nickname = computed(() => info.value.nickname)

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
  isLogined.value = false
  router.push('/login')
}

const handleLogout = async () => {
  deleteLogout()
  openLogoutModal()
  emit('close')
}
</script>
