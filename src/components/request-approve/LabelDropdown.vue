<template>
  <div>
    <div class="text-xs mb-2 text-body font-bold">구분</div>
    <div class="relative flex text-base">
      <div
        class="flex w-full h-11 items-center rounded p-4 bg-white border border-border-1 cursor-pointer text-black"
        @click="toggleDropdown">
        <p :class="{ 'text-disabled': !modelValue }">
          {{ modelValue?.labelName || placeholderText }}
        </p>
        <CommonIcons
          :name="dropdownIcon"
          :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
      </div>
      <div
        v-if="dropdownOpen"
        class="absolute w-full h-40 overflow-y-auto top-[52px] flex flex-col gap-2 p-2 bg-white rounded z-10 shadow border-t border-t-border-2 text-black">
        <div
          v-for="option in labelArr"
          :key="option.labelId"
          class="w-full flex items-center h-11 p-2 rounded hover:bg-background-2 cursor-pointer"
          @click="selectOption(option)">
          {{ option.labelName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLabelsManager } from '@/api/user'
import { dropdownIcon } from '@/constants/iconPath'
import type { LabelDataTypes } from '@/types/common'
import type { LabelDropdownProps } from '@/types/user'
import { onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { modelValue, placeholderText } = defineProps<LabelDropdownProps>()
const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)

const labelArr = ref<LabelDataTypes[]>([])

onMounted(async () => {
  emit('update:modelValue', null)
  labelArr.value = await getLabelsManager()
})
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: LabelDataTypes) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}
</script>
