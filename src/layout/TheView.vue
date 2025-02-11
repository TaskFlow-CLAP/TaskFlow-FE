<template>
  <div class="w-full">
    <div v-if="selectedID">
      <TaskDetail
        v-if="selectedID"
        :selected-id="Number(selectedID)"
        :close-task-detail="() => handleModal(null)" />
    </div>
    <ModalView
      type="failType"
      :is-open="header !== ''"
      @close="computedOnClick">
      <template
        v-if="header"
        #header>
        {{ header }}
      </template>
      <template
        v-if="body"
        #body>
        {{ body }}
      </template>
    </ModalView>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import TaskDetail from '@/components/task-detail/TaskDetail.vue'
import ModalView from '@/components/common/ModalView.vue'
import { useErrorStore } from '@/stores/error'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

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

const errorStore = useErrorStore()
const { header, body } = storeToRefs(errorStore)
const computedOnClick = computed(() => {
  return errorStore.onClick ? errorStore.onClick : errorStore.clearError
})
</script>
