<template>
  <div class="text-xs font-bold">
    <p class="text-body mb-2">{{ labelName }}</p>
    <div
      @click="!isDisabled && updateValue()"
      :class="[
        'w-fit flex gap-2 items-center',
        { 'cursor-pointer': !isDisabled, 'cursor-not-allowed': isDisabled }
      ]">
      <CommonIcons
        :name="checkBoxIcon"
        :class="[
          'w-4 h-4 rounded-full',
          { 'bg-primary1 text-white': isChecked, 'border border-disabled': !isChecked }
        ]"
        :style="isChecked ? { fill: 'white' } : {}" />
      <p>{{ checkButtonName }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { checkBoxIcon } from '@/constants/iconPath'
import type { FormCheckboxProps } from '@/types/common'
import { watch } from 'vue'
import CommonIcons from './CommonIcons.vue'

const { labelName, checkButtonName, isChecked, isDisabled } = defineProps<FormCheckboxProps>()
const emit = defineEmits(['update:modelValue'])

const updateValue = () => {
  emit('update:modelValue', !isChecked)
}

watch(
  () => isDisabled,
  newVal => {
    if (newVal) {
      emit('update:modelValue', false)
    }
  }
)
</script>
