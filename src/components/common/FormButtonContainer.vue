<template>
  <div class="w-full mt-4 flex justify-center">
    <div class="w-[400px] flex gap-6">
      <button
        type="button"
        class="button-large-default"
        @click="handleCancel">
        {{ cancelText }}
      </button>
      <button
        type="button"
        class="button-large-primary"
        @click="handleSubmit">
        {{ submitText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormButtonProps } from '@/types/common'

const { handleCancel, handleSubmit, cancelText, submitText } = defineProps<FormButtonProps>()
</script>
