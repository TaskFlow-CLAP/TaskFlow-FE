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
import { useRoute } from 'vue-router'

import TaskDetail from '@/components/task-detail/TaskDetail.vue'
import router from '@/router'

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
  if (id === null) {
    document.body.style.overflow = ''
    router.push({ query: {} })
  }
}
</script>
