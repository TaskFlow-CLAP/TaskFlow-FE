<template>
  <div
    ref="htmlRef"
    class="relative flex text-base">
    <div
      class="flex w-full h-10 items-center rounded p-4 bg-white border border-border-1 cursor-pointer text-sm text-black"
      @click="toggleDropdown">
      <p :class="{ 'text-disabled': !modelValue?.labelName }">
        {{ modelValue?.labelName || placeholderText }}
      </p>
      <CommonIcons
        :name="dropdownIcon"
        :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
    </div>
    <div
      v-if="dropdownOpen"
      class="absolute w-full pb-6 top-12">
      <div
        class="w-full h-32 overflow-y-auto flex flex-col gap-2 p-2 bg-white rounded z-10 shadow-custom text-black">
        <div
          v-for="option in labelArr"
          :key="option.labelId"
          class="w-full flex text-sm items-center h-10 p-1.5 rounded hover:bg-background-2 cursor-pointer"
          @click="selectOption(option)">
          {{ option.labelName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { changeLabel, getLabelsManager } from '@/api/user'
import { dropdownIcon } from '@/constants/iconPath'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { LabelDataTypes } from '@/types/common'
import type { LabelDropdownProps } from '@/types/user'
import { onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { modelValue, placeholderText, taskId } = defineProps<LabelDropdownProps>()
const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)

const labelArr = ref<LabelDataTypes[]>([])

onMounted(async () => {
  labelArr.value = await getLabelsManager()
})
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = async (option: LabelDataTypes) => {
  emit('update:modelValue', option)
  await changeLabel(taskId || 0, option.labelId || 0)
  dropdownOpen.value = false
}

const { htmlRef } = useOutsideClick(() => dropdownOpen.value && toggleDropdown())
</script>
