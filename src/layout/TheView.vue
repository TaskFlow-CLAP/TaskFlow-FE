<template>
  <div class="w-full">
    <div v-if="selectedID">
      <TaskDetail
        v-if="selectedID"
        :selected-id="Number(selectedID)"
        :close-task-detail="() => handleModal(null)" />
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import TaskDetail from '@/components/task-detail/TaskDetail.vue'

const route = useRoute()
const router = useRouter()
const selectedID = ref(route.query?.taskId || null)

watch(
  () => route.query.taskId,
  newTaskId => {
    selectedID.value = newTaskId
  }
)

const handleModal = (id: string | null) => {
  selectedID.value = id
  if (id === null) {
    router.replace({ query: {} })
  }
}
</script>
