<template>
  <div
    class="w-full max-w-80 border-l-8 bg-white p-4 flex flex-col gap-6 rounded-lg shadow-custom hover:bg-background-2 cursor-pointer"
    :class="borderLeft"
    @click="handleModal(data.taskId)">
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center gap-4">
        <div class="flex items-center gap-2 overflow-hidden">
          <TaskLabel
            v-if="data.labelInfo"
            :color="data.labelInfo.labelColor"
            :content="data.labelInfo.labelName" />
          <span class="line-clamp-2">{{ data.title }}</span>
        </div>
        <CommonIcons
          v-if="draggable"
          :name="bentoIcon" />
      </div>
      <span class="text-xs text-body">{{ data.mainCategoryName }} - {{ data.categoryName }}</span>
    </div>
    <div class="flex justify-between items-end">
      <span class="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
        {{ data.taskCode }}
      </span>
      <div class="flex flex-col gap-1 items-end">
        <span class="text-xs font-semibold text-body">{{ data.requesterDepartment }}</span>
        <div class="flex items-center gap-1.5">
          <ImageContainer
            :url="data.requesterImageUrl"
            :size="16" />
          <span class="text-xs font-semibold">{{ data.requesterNickname }}</span>
        </div>
      </div>
    </div>
  </div>
  <TaskDetail
    v-if="selectedID"
    :selected-id="selectedID"
    :close-task-detail="() => handleModal(null)" />
</template>

<script setup lang="ts">
import { bentoIcon } from '@/constants/iconPath'
import { useIsOverlayOpenStore } from '@/stores/isOverlayOpen'
import { useTeamBoardParamsStore } from '@/stores/params'
import type { Status } from '@/types/common'
import type { TaskCardProps } from '@/types/manager'
import { statusAsColor } from '@/utils/statusAsColor'
import { useQueryClient } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import TaskDetail from '../task-detail/TaskDetail.vue'
import CommonIcons from './CommonIcons.vue'
import ImageContainer from './ImageContainer.vue'
import TaskLabel from './TaskLabel.vue'

const { data } = defineProps<{ data: TaskCardProps; draggable?: boolean }>()
const emit = defineEmits(['toggleModal'])
const selectedID = ref<number | null>(null)
const queryClient = useQueryClient()
const { params } = useTeamBoardParamsStore()

const borderLeft = computed(() => {
  return `border-${statusAsColor(data.taskStatus as Status)}-1`
})

const { setIsOverlayOpen } = useIsOverlayOpenStore()
const handleModal = (id: number | null) => {
  if (!id) {
    queryClient.invalidateQueries({
      queryKey: ['taskBoard']
    })
    queryClient.invalidateQueries({
      queryKey: ['teamStatus', params]
    })
    setIsOverlayOpen(false)
  }
  emit('toggleModal')
  selectedID.value = id
}
</script>
