<template>
  <div class="w-full">
    <div
      v-for="division in divisionData"
      :key="division.divisionId"
      class="flex w-full flex-col">
      <div class="category-management-line justify-between">
        <div class="flex gap-7 items-center pl-3 relative">
          <div
            :style="{
              borderColor: getColor(division.divisionColor)?.borderColor,
              backgroundColor: getColor(division.divisionColor)?.fillColor
            }"
            class="w-4 h-4 rounded-full border-2 cursor-pointer pr-3"
            @click="clickColor(division.divisionId)"></div>
          <ColorSelectModal
            v-if="isColorModalVisible && selectedDivisionId === division.divisionId"
            :is-open="isColorModalVisible"
            :devisionId="division.divisionId"
            :selectedDivisionId="selectedDivisionId"
            @close="closeColor" />
          <p class="text-black">{{ division.divisionName }}</p>
        </div>
        <div class="flex gap-2 text-xs font-bold">
          <button
            @click="router.push('수정경로')"
            class="text-primary1">
            수정
          </button>
          <button
            @click="handleDelete"
            class="text-red-1">
            삭제
          </button>
        </div>
      </div>
      <ModalView
        type="warningType"
        :is-open="isModalVisible"
        @close="handleCancel">
        <template #header>구분을 삭제 하시겠습니까?</template>
        <template #body>삭제된 구분은 복구할 수 없습니다</template>
      </ModalView>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DivisionDataTypes } from '@/types/admin'
import { getColor } from '@/utils/color'
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../ModalView.vue'
import ColorSelectModal from './ColorSelectModal.vue'

const { divisionData } = defineProps<{ divisionData: DivisionDataTypes[] }>()

const router = useRouter()

const isModalVisible = ref(false)
const isColorModalVisible = ref(false)
const selectedDivisionId = ref<number | null>(null)

const handleCancel = () => {
  isModalVisible.value = false
}

const handleDelete = () => {
  isModalVisible.value = true
}

const clickColor = (divisionId: number) => {
  isColorModalVisible.value = true
  selectedDivisionId.value = divisionId
}

const closeColor = () => {
  isColorModalVisible.value = false
  selectedDivisionId.value = null
}
</script>
