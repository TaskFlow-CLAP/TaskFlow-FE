<template>
  <div class="text-xs font-bold">
    <p class="text-body mb-2">{{ labelName }}</p>
    <div class="flex gap-2 items-center cursor-pointer">
      <CommonIcons
        :name="checkBoxIcon"
        :class="[
          'w-4 h-4 rounded-full',
          { 'bg-primary1 text-white': isChecked, 'border border-disabled': !isChecked }
        ]"
        :style="isChecked ? { fill: 'white' } : {}"
        @click="updateValue" />
      <p>{{ checkButtonName }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { checkBoxIcon } from '@/constants/iconPath'
import type { FormCheckboxProps } from '@/types/common'
import CommonIcons from './CommonIcons.vue'

const { labelName, checkButtonName, isChecked } = defineProps<FormCheckboxProps>()
const emit = defineEmits(['update:modelValue'])

const updateValue = () => {
  emit('update:modelValue', !isChecked)
}
</script>
