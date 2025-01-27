<template>
  <div class="list-card">
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

const { info } = defineProps<{ info: LoginLogsListData }>()
const myRequestTabList: ListCardProps[] = [
  { content: info.division, width: 80, isTextXs: true, isTextBody: true },
  { content: info.createdAt, width: 180, isTextXs: true },
  { content: info.nickName, width: 80 },
  { content: info.ipAddress, width: 120, isTextXs: true },
  { content: String(info.status), width: 40, isTextXs: true, isStatusCode: true },
  { content: info.result }
]
</script>
