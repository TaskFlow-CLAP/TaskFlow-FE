<template>
  <div
    :onClick="closeTaskDetail"
    class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-50 p-12">
    <div
      @click.stop
      class="flex flex-col overflow-y-auto rounded-lg w-full max-w-[1200px] min-w-[768px] h-full bg-white p-6">
      <TaskDetailTopBar
        v-if="data"
        :is-approved="data?.taskStatus !== 'REQUESTED'"
        :close-task-detail="closeTaskDetail"
        :id="data?.taskId || 0"
        :isProcessor="data?.processorNickName === info.nicknanme || info.role === 'ROLE_MANAGER'"
        :isRequestor="data?.requesterNickName === info.nicknanme" />
      <div
        v-if="data"
        class="w-full flex gap-6 relative overflow-y-auto">
        <div class="w-full flex flex-col gap-y-8 overflow-y-auto scrollbar-hide">
          <TaskDetailLeft :data="data" />
          <div class="w-full h-[1px] bg-border-1 shrink-0"></div>
          <TaskDetailHistory
            :historyData="historyData?.histories || []"
            :task-id="selectedId"
            :requestor-name="data.requesterNickName" />
        </div>
        <div class="w-[1px] bg-border-1"></div>
        <TaskDetailRight
          :data
          :isProcessor="data?.processorNickName === info.nicknanme" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHistory, getTaskDetailManager, getTaskDetailUser } from '@/api/user'
import { useMemberStore } from '@/stores/member'
import type { TaskDetailDatas, TaskDetailHistoryData, TaskDetailProps } from '@/types/user'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch, ref } from 'vue'
import TaskDetailHistory from './TaskDetailHistory.vue'
import TaskDetailLeft from './TaskDetailLeft.vue'
import TaskDetailRight from './TaskDetailRight.vue'
import TaskDetailTopBar from './TaskDetailTopBar.vue'

const { closeTaskDetail, selectedId } = defineProps<TaskDetailProps>()
const queryClient = useQueryClient()

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const userRole = computed(() => info.value.role)
const isDataFetched = ref(false)

const fetchData = async () => {
  if (!userRole.value) return
  const result =
    userRole.value === 'ROLE_USER'
      ? await getTaskDetailUser(selectedId)
      : await getTaskDetailManager(selectedId)
  isDataFetched.value = true
  return result
}

const { data, refetch } = useQuery<TaskDetailDatas>({
  queryKey: ['taskDetailUser', selectedId],
  queryFn: fetchData,
  enabled: false // Initially disabled
})

const { data: historyData } = useQuery<TaskDetailHistoryData>({
  queryKey: ['historyData', selectedId],
  queryFn: () => getHistory(selectedId),
  enabled: isDataFetched.value
})

// Watch for role changes and trigger refetch
watch(
  userRole,
  async newRole => {
    if (newRole) {
      await queryClient.invalidateQueries({ queryKey: ['taskDetailUser', selectedId] })
      await refetch()
    }
  },
  { immediate: true }
)
</script>
