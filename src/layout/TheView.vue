<template>
  <div class="w-full">
    <div v-if="selectedID">
      <TaskDetail
        :selected-id="Number(selectedID)"
        :close-task-detail="() => handleModal(null)" />
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import TaskDetail from '@/components/task-detail/TaskDetail.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedID = ref(route.query.taskId || null)
const handleModal = (id: string | null) => {
  selectedID.value = id
}

watch(
  () => route.query.taskId,
  newTaskID => {
    selectedID.value = newTaskID || null
  }
)

onMounted(() => {
  if (route.query.taskId) {
    selectedID.value = route.query.taskId
  }
})
</script>
