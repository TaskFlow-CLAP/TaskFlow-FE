<template>
  <div
    v-if="isOpen"
    @click.stop
    class="absolute right-6 top-[calc(100%+16px)] h-60 w-80 bg-white rounded-lg shadow-custom overflow-hidden flex flex-col">
    <div class="flex justify-between items-center px-4 pt-3 pb-2 border-b border-border-2">
      <p class="text-body font-bold text-xs">알림</p>
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="readAllNotifi"
          class="flex items-center gap-1 p-1 rounded hover:bg-background-2">
          <CommonIcons :name="smallCheckIcon" />
          <p class="font-bold text-primary1 text-xs">모두 읽음</p>
        </button>
        <button
          type="button"
          class="hover:bg-background-2 rounded"
          @click="closeModal">
          <CommonIcons :name="closeIcon" />
        </button>
      </div>
    </div>
    <div class="grow h-full flex flex-col overflow-y-auto">
      <NotificationMessage
        v-for="notification in notifications"
        :key="notification.notificationId"
        @click="readNotifi(notification.notificationId, notification.taskId)"
        :type="notification.notificationType"
        :title="notification.taskTitle"
        :message="notification.message"
        :is-read="notification.isRead">
      </NotificationMessage>
      <InfiniteLoading
        @infinite="loadMoreNotifications"
        class="flex items-center justify-center">
        <template v-slot:complete>
          <span class="flex py-4 items-center justify-center text-xs text-primary1">
            알림을 전부 확인했습니다
          </span>
        </template>
      </InfiniteLoading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNotification, patchNotificationRead } from '@/api/common'
import { closeIcon, smallCheckIcon } from '@/constants/iconPath'
import type { NotificationContent } from '@/types/common'
import { axiosInstance } from '@/utils/axios'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import NotificationMessage from './NotificationMessage.vue'
import { useRouter } from 'vue-router'

const { isOpen } = defineProps<{
  isOpen: boolean
}>()

const router = useRouter()

const notifications = ref<NotificationContent[]>([])
const page = ref(0)
const pageSize = 5
const hasNext = ref(true)

interface InfiniteLoadingState {
  loaded: () => void
  complete: () => void
  error: () => void
}

const loadMoreNotifications = async ($state: InfiniteLoadingState) => {
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

const readNotifi = async (id: number, taskId: number) => {
  document.body.style.overflow = 'hidden'
  await patchNotificationRead(id)
  emit('close')
  router.push({ query: { taskId } })
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}

const readAllNotifi = async () => {
  await axiosInstance.patch('/api/notifications')
  emit('close')
}
</script>
