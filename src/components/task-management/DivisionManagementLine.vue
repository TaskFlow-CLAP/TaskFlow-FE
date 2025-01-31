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
            @click="isEdit && clickColor(division.divisionId)"></div>
          <ColorSelectModal
            v-if="isColorModalVisible && editValue.divisionId === division.divisionId"
            :is-open="isColorModalVisible"
            :devisionId="division.divisionId"
            :selectedDivisionId="selectedDivisionId"
            @close="closeColor" />
          <input
            v-if="isEdit && editValue.divisionId === division.divisionId"
            v-model="editValue.divisionName"
            type="text"
            placeholder="새로운 구분명을 입력"
            class="w-full flex focus:outline-none" />
          <p
            v-else
            class="text-black">
            {{ division.divisionName }}
          </p>
        </div>
        <div class="flex gap-2 text-xs font-bold">
          <button
            @click="
              isEdit && editValue.divisionId === division.divisionId
                ? finishEdit()
                : startEdit(division)
            "
            class="text-primary1 w-[21px]">
            {{ isEdit && editValue.divisionId === division.divisionId ? '확인' : '수정' }}
          </button>
          <button
            @click="
              isEdit && editValue.divisionId === division.divisionId ? cancelEdit() : handleDelete()
            "
            :class="
              isEdit && editValue.divisionId === division.divisionId
                ? 'text-disabled w-[21px]'
                : 'text-red-1 w-[21px]'
            ">
            {{ isEdit&& editValue.divisionId === division.divisionId ? '취소' : '삭제' }}
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
import ModalView from '../ModalView.vue'
import ColorSelectModal from './ColorSelectModal.vue'

const { divisionData } = defineProps<{ divisionData: DivisionDataTypes[] }>()

const isModalVisible = ref(false)
const isEdit = ref(false)
const isColorModalVisible = ref(false)
const selectedDivisionId = ref<number | null>(null)
const editValue = ref<DivisionDataTypes>({
  divisionName: '',
  divisionColor: '',
  divisionId: 9999
})

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
}

const startEdit = (division: DivisionDataTypes) => {
  isEdit.value = true
  editValue.value = division
}

const finishEdit = () => {
  isEdit.value = false
}

const cancelEdit = () => {
  isEdit.value = false
}
</script>
