<template>
  <div class="w-full">
    <TaskDetail
      :selected-id="Number(selectedID)"
      :close-task-detail="() => handleModal(null)" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import TaskDetail from '@/components/task-detail/TaskDetail.vue'

const route = useRoute()
const selectedID = ref(route.query?.taskId || null)

watch(
  () => route.query.taskId,
  newTaskId => {
    selectedID.value = newTaskId
  }
)

const handleModal = (id: string | null) => {
  selectedID.value = id
}
</script>
