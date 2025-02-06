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
import RequestTask from '@/components/request-task/RequestTask.vue'
import ReRequestTask from '@/components/request-task/ReRequestTask.vue'
import TitleBar from '@/components/TitleBar.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const reqType = ref(route.query.requestType || null)
const id = ref(route.query.id || null)
console.log(reqType.value, id.value)

watch(
  () => route.query.requestType,
  newReqType => {
    reqType.value = newReqType || null
  }
)

watch(
  () => route.query.id,
  newId => {
    id.value = newId || null
  }
)
</script>
