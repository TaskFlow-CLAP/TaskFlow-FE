<template>
  <div
    v-if="selectedId"
    :onClick="closeTaskDetail"
    class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-50 p-12" />
  <Transition name="modal">
    <div
      v-if="selectedId"
      @click.stop
      class="flex flex-col overflow-y-auto rounded-lg w-[calc(100%-96px)] max-w-[1104px] min-w-[768px] h-[calc(100%-96px)] bg-white shadow-custom py-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <TaskDetailTopBar
        v-if="data"
        :is-approved="isApproved"
        :close-task-detail="closeTaskDetail"
        :id="data?.taskId || 0"
        :isProcessor="data?.processorNickName === info.nickname || info.role === 'ROLE_MANAGER'"
        :isRequestor="data?.requesterNickName === info.nickname" />
      <div
        v-if="data"
        class="w-full flex relative overflow-y-auto">
        <div class="w-full flex flex-col gap-y-8 overflow-y-auto scrollbar-hide p-6">
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
          :isProcessor="data?.processorNickName === info.nickname" />
      </div>
    </div>
  </Transition>
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

const { closeTaskDetail, selectedId, isApproved } = defineProps<TaskDetailProps>()
const queryClient = useQueryClient()

const memberStore = useMemberStore()
const { info } = storeToRefs(memberStore)

const userRole = computed(() => info.value.role)
const checkId = computed(() => selectedId !== null)
const isDataFetched = ref(false)

const fetchData = async () => {
  if (!userRole.value || !selectedId) return null
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
  enabled: false
})

const { data: historyData } = useQuery<TaskDetailHistoryData>({
  queryKey: ['historyData', selectedId],
  queryFn: () => getHistory(selectedId),
  enabled: isDataFetched.value
})

watch(
  [userRole, checkId],
  async params => {
    if (params) {
      await queryClient.invalidateQueries({ queryKey: ['taskDetailUser', selectedId] })
      await refetch()
    }
  },
  { immediate: true }
)
</script>
