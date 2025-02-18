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
import { API_LOGS_DIVISION_LIST } from '@/constants/admin'
import type { ApiLogsListData } from '@/types/admin'
import type { ListCardProps } from '@/types/common'
import { formatFullDateTime } from '@/utils/date'
import ListCardTab from '../lists/ListCardTab.vue'

const { info } = defineProps<{ info: ApiLogsListData }>()
const myRequestTabList: ListCardProps[] = [
  {
    content: API_LOGS_DIVISION_LIST.find(el => el.value === info.logStatus)?.content,
    width: 80,
    isTextXs: true,
    isTextBody: true
  },
  { content: formatFullDateTime(info.requestAt), width: 180, isTextXs: true },
  { content: info.nickName, width: 80 },
  { content: info.clientIp, width: 120, isTextXs: true },
  { content: String(info.statusCode), width: 40, isTextXs: true, isStatusCode: true },
  { content: '' }
]
</script>
