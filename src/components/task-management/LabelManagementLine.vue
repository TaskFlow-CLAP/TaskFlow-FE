<template>
  <div class="w-full">
    <div
      v-for="label in labelData"
      :key="label.labelId"
      class="flex w-full flex-col">
      <div class="category-management-line justify-between bg-white">
        <div class="flex gap-7 items-center pl-3 relative">
          <div
            :style="{
              borderColor: getColor(label.labelColor)?.borderColor,
              backgroundColor: getColor(label.labelColor)?.fillColor
            }"
            class="w-4 h-4 rounded-full border-2 cursor-pointer pr-3"
            @click="isEdit && clickColor(label.labelId)"></div>
          <ColorSelectModal
            v-if="isColorModalVisible && editValue.labelId === label.labelId"
            :is-open="isColorModalVisible"
            :label-id="label.labelId"
            :selectedLabelId="selectedLabelId"
            @close="closeColor" />
          <input
            v-if="isEdit && editValue.labelId === label.labelId"
            v-model="editValue.labelName"
            type="text"
            placeholder="새로운 구분명을 입력"
            class="w-full flex focus:outline-none" />
          <p
            v-else
            class="text-black">
            {{ labelData[0].labelName }}
          </p>
        </div>
        <div class="flex gap-2 text-xs font-bold">
          <button
            @click="isEdit && editValue.labelId === label.labelId ? finishEdit() : startEdit(label)"
            class="text-primary1 w-[21px]">
            {{ isEdit && editValue.labelId === label.labelId ? '확인' : '수정' }}
          </button>
          <button
            @click="isEdit && editValue.labelId === label.labelId ? cancelEdit() : handleDelete()"
            :class="
              isEdit && editValue.labelId === label.labelId
                ? 'text-disabled w-[21px]'
                : 'text-red-1 w-[21px]'
            ">
            {{ isEdit && editValue.labelId === label.labelId ? '취소' : '삭제' }}
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
import type { LabelDataTypes } from '@/types/admin'
import { getColor } from '@/utils/color'
import { defineProps, ref } from 'vue'
import ModalView from '../ModalView.vue'
import ColorSelectModal from './ColorSelectModal.vue'

const { labelData } = defineProps<{ labelData: LabelDataTypes[] }>()

const isModalVisible = ref(false)
const isEdit = ref(false)
const isColorModalVisible = ref(false)
const selectedLabelId = ref<number | null>(null)
const editValue = ref<LabelDataTypes>({
  labelName: '',
  labelColor: '',
  labelId: 9999
})

const handleCancel = () => {
  isModalVisible.value = false
}

const handleDelete = () => {
  isModalVisible.value = true
}

const clickColor = (labelId: number) => {
  isColorModalVisible.value = true
  selectedLabelId.value = labelId
}

const closeColor = () => {
  isColorModalVisible.value = false
}

const startEdit = (label: LabelDataTypes) => {
  isEdit.value = true
  editValue.value = label
}

const finishEdit = () => {
  isEdit.value = false
}

const cancelEdit = () => {
  isEdit.value = false
}
</script>
