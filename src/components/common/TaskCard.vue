<template>
  <div
    class="w-full max-w-80 border-l-8 bg-white py-4 pl-6 pr-4 flex flex-col gap-6 rounded-lg shadow-custom hover:bg-background-2 cursor-pointer"
    :class="borderLeft"
    @click="handleModal(data.taskId)">
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center gap-4">
        <div class="flex items-center gap-2 overflow-hidden">
          <TaskLabel
            v-if="data.labelInfo"
            :color="data.labelInfo.labelColor"
            :content="data.labelInfo.labelName" />
          <span class="text-black text-ellipsis overflow-hidden whitespace-nowrap">{{
            data.title
          }}</span>
        </div>
        <CommonIcons
          v-if="draggable"
          :name="bentoIcon" />
      </div>
      <span class="text-xs text-body">{{ data.mainCategoryName }} - {{ data.categoryName }}</span>
    </div>
    <div class="flex justify-between items-end">
      <span class="text-xs font-bold text-black whitespace-nowrap overflow-hidden text-ellipsis">{{
        data.taskCode
      }}</span>
      <div class="flex flex-col gap-1 items-end">
        <span class="text-xs font-bold text-body">{{ data.requesterDepartment }}</span>
        <div class="flex items-center gap-1.5">
          <ImageContainer
            :url="data.requesterImageUrl"
            :size="16" />
          <span class="text-xs font-bold text-black">{{ data.requesterNickname }}</span>
        </div>
      </div>
    </div>
    <TaskDetail
      v-if="selectedID"
      :is-approved="data.taskStatus !== 'REQUESTED'"
      :selected-id="selectedID"
      :close-task-detail="() => handleModal(null)" />
  </div>
</template>

<script setup lang="ts">
import { bentoIcon } from '@/constants/iconPath'
import type { Status } from '@/types/common'
import type { TaskCardProps } from '@/types/manager'
import { statusAsColor } from '@/utils/statusAsColor'
import { computed, ref } from 'vue'
import CommonIcons from './CommonIcons.vue'
import TaskLabel from './TaskLabel.vue'
import ImageContainer from './ImageContainer.vue'
import TaskDetail from '../task-detail/TaskDetail.vue'

const { data } = defineProps<{ data: TaskCardProps; draggable?: boolean }>()
const selectedID = ref<number | null>(null)

const borderLeft = computed(() => {
  return `border-${statusAsColor(data.taskStatus as Status)}-1`
})

const handleModal = (id: number | null) => {
  if (data.taskId) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
  selectedID.value = id
}
</script>
