<template>
  <div>
    <p class="task-detail">담당자</p>
    <div class="relative flex text-base">
      <div
        class="task-detail-manager-dropdown"
        @click="toggleDropdown">
        <div class="flex gap-2 items-center">
          <div
            v-if="modelValue"
            class="w-5 h-5 rounded-full overflow-hidden">
            <img
              :src="modelValue?.imageUrl || '/images/mockProfile.jpg'"
              alt="userProfile" />
          </div>
          <p>
            {{ modelValue?.nickname }}
          </p>
        </div>
        <CommonIcons
          :name="dropdownIcon"
          :class="['ml-auto', { 'rotate-180': dropdownOpen }]" />
      </div>
      <div
        v-if="dropdownOpen"
        class="request-task-dropdown-option-list">
        <div
          v-for="option in managerArr"
          :key="option.memberId"
          class="request-task-dropdown-option justify-between"
          @click="selectOption(option)">
          <div class="flex gap-2">
            <div class="w-5 h-5 rounded-full overflow-hidden">
              <img
                :src="option.imageUrl || '/images/mockProfile.jpg'"
                alt="userProfile" />
            </div>
            <p>
              {{ option.nickname }}
            </p>
          </div>
          <p class="text-primary1 text-xs">잔여 작업 : {{ option.remainingTasks }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getManager } from '@/api/user'
import { dropdownIcon } from '@/constants/iconPath'
import type { ManagerTypes } from '@/types/manager'
import { onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'

const { modelValue } = defineProps<{ modelValue: ManagerTypes }>()
const emit = defineEmits(['update:modelValue'])

const dropdownOpen = ref(false)
const managerArr = ref<ManagerTypes[]>([])

onMounted(async () => {
  managerArr.value = await getManager()
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option: ManagerTypes) => {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}
</script>
