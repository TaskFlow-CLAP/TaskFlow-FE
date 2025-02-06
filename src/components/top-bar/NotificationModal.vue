<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex z-50 justify-center"
    @click.self="closeModal">
    <div
      class="flex relative w-[1200px] h-[72px] bg-opacity-15"
      @click.self="closeModal">
      <div
        class="absolute right-6 top-[72px] h-60 w-80 bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
        <div class="flex relative px-4 pt-3 pb-2 border-b border-border-2">
          <p class="text-body font-bold text-xs">알림</p>
          <div class="absolute right-4">
            <div class="flex items-center">
              <button class="flex items-center">
                <CommonIcons
                  :name="smallCheckIcon"
                  class="w-2.5 h-1.5 mr-1 fill-primary1" />
                <p class="font-bold text-primary1 text-xs">모두 읽음</p>
              </button>
              <CommonIcons
                :name="closeIcon"
                class="ml-2 cursor-pointer"
                @click="closeModal" />
            </div>
          </div>
        </div>
        <div class="max-h-[185px] flex flex-col h-full overflow-y-auto">
          <div class="overflow-y-scroll flex flex-col">
            <button
              v-for="notification in notifications"
              :key="notification.notificationId"
              @click="readNotifi(notification.notificationId)"
              :class="[
                'flex flex-col border-b py-3 px-4',
                { 'bg-primary2': !notification.isRead }
              ]">
              <p class="text-xs text-body font-bold">
                {{ notification.notificationType }}
              </p>
              <div class="flex text-xs pt-2">
                <span class="text-black">
                  <span class="text-primary1 font-bold"> "{{ notification.taskTitle }}" </span>
                  &nbsp;요청이&nbsp;
                  <span class="text-primary1 font-bold">
                    {{ notification.message }}
                  </span>
                  &nbsp;상태로 변경되었습니다.
                </span>
              </div>
            </button>
            <InfiniteLoading
              @infinite="loadMoreNotifications"
              class="flex items-center justify-center"
              ><template v-slot:complete>
                <span class="flex py-2 items-center justify-center text-xs text-primary1"
                  >더 이상 없음</span
                >
              </template></InfiniteLoading
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import CommonIcons from '../common/CommonIcons.vue'
import { smallCheckIcon, closeIcon } from '@/constants/iconPath'
import { getNotification, patchNotificationRead } from '@/api/common'

const props = defineProps<{
  isOpen: boolean
}>()

const notifications = ref<any[]>([])
const page = ref(0)
const pageSize = 5
const hasNext = ref(true)

const loadMoreNotifications = async ($state: any) => {
  try {
    const response = await getNotification(page.value, pageSize)

    if (response.isFirst) {
      notifications.value = response.content
    } else {
      notifications.value.push(...response.content)
    }

    hasNext.value = response.hasNext

    if (hasNext.value) {
      page.value++
      $state.loaded()
    } else {
      $state.complete()
    }
  } catch (error) {
    console.error('알림을 불러오는 중 오류 발생:', error)
    $state.error()
  }
}

const readNotifi = (id: number) => {
  patchNotificationRead(id)
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}
</script>
