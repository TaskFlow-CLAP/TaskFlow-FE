<template>
  <ModalView
    :type="type"
    :is-open="isOpen"
    @close="emit('close')">
    <template #header>{{ message }}</template>
  </ModalView>
</template>

<script setup lang="ts">
import ModalView from './ModalView.vue'

const { type, isOpen, message } = defineProps<{
  type: string
  isOpen: boolean
  message: string
}>()
const emit = defineEmits(['close'])
</script>
