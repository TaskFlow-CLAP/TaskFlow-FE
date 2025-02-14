<template>
  <div class="list-card !cursor-default">
    <ListCardTab
      v-for="tab in myRequestTabList"
      :key="tab.content"
      :content="tab.content"
      :width="tab.width"
      :is-text-xs="tab.isTextXs"
      :is-status="tab.isStatus"
      :is-status-code="tab.isStatusCode"
      :is-text-body="tab.isTextBody" />
  </div>
</template>

<script setup lang="ts">
import type { ListCardProps } from '@/types/common'
import ListCardTab from '../lists/ListCardTab.vue'
import type { LoginLogsListData } from '@/types/admin'
import { formatFullDateTime } from '@/utils/date'

const logStatus = {
  LOGIN: '로그인 시도'
}

const { info } = defineProps<{ info: LoginLogsListData }>()
const myRequestTabList: ListCardProps[] = [
  {
    content: logStatus[info.logStatus as keyof typeof logStatus],
    width: 80,
    isTextXs: true,
    isTextBody: true
  },
  { content: formatFullDateTime(info.requestAt), width: 180, isTextXs: true },
  { content: info.nickName, width: 80 },
  { content: info.clientIp, width: 120, isTextXs: true },
  { content: String(info.statusCode), width: 40, isTextXs: true, isStatusCode: true },
  {
    content:
      info.statusCode !== 200 && info.failedAttempts !== 0
        ? `failedAttempts = ${info.failedAttempts}`
        : ''
  }
]
</script>
