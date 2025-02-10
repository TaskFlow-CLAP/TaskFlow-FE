<template>
  <div class="form-view-container">
    <TitleBar title="작업 요청" />
    <component
      :is="!reqType ? RequestTask : ReRequestTask"
      :id
      :reqType />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import RequestTask from '@/components/request-task/RequestTask.vue'
import ReRequestTask from '@/components/request-task/ReRequestTask.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const reqType = ref(route.query.requestType || null)
const id = ref(route.query.id || null)

watch(
  () => route.query,
  newQuery => {
    reqType.value = newQuery.requestType || null
    id.value = newQuery.id || null
  },
  { deep: true }
)
</script>
