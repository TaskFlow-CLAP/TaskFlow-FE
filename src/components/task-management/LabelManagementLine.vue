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
            class="w-4 h-4 rounded-full border-2 cursor-pointer pr-3 relative"
            @click="isEdit && clickColor(label.labelId)"></div>
          <ColorSelectModal
            v-if="isColorModalVisible && editValue.labelId === label.labelId"
            :is-open="isColorModalVisible && editValue.labelId === label.labelId"
            :new-label="editValue"
            @update-color="updateLabelColor"
            @close="handleColorModal" />
          <input
            v-if="isEdit && editValue.labelId === label.labelId"
            v-model="editValue.labelName"
            placeholder="새로운 구분명을 입력"
            class="w-full flex focus:outline-none" />
          <p
            v-else
            class="text-black">
            {{ label.labelName }}
          </p>
        </div>
        <div class="flex gap-2 text-xs font-bold">
          <button
            type="button"
            @click="isEdit && editValue.labelId === label.labelId ? finishEdit() : startEdit(label)"
            class="text-primary1 w-[21px] hover:underline">
            {{ isEdit && editValue.labelId === label.labelId ? '확인' : '수정' }}
          </button>
          <button
            type="button"
            @click="
              isEdit && editValue.labelId === label.labelId
                ? handleEdit()
                : handleDeleteModal(label.labelId)
            "
            :class="
              isEdit && editValue.labelId === label.labelId
                ? 'text-disabled w-[21px] hover:underline'
                : 'text-red-1 w-[21px] hover:underline'
            ">
            {{ isEdit && editValue.labelId === label.labelId ? '취소' : '삭제' }}
          </button>
        </div>
      </div>
    </div>
    <ModalView
      type="warningType"
      :is-open="isModalVisible"
      @close="handleDeleteModal(null)"
      @click="deleteLabel(selectedLabelId || 0)">
      <template #header>구분을 삭제 하시겠습니까?</template>
      <template #body>삭제된 구분은 복구할 수 없습니다</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { deleteLabelAdmin, patchLabelAdmin } from '@/api/admin'
import type { LabelColorTypes, LabelDataTypes } from '@/types/common'
import { getColor } from '@/utils/color'
import { defineProps, ref } from 'vue'
import ModalView from '../ModalView.vue'
import ColorSelectModal from './ColorSelectModal.vue'

const { labelData } = defineProps<{ labelData: LabelDataTypes[] }>()

const isModalVisible = ref(false)
const isColorModalVisible = ref(false)
const isEdit = ref(false)
const selectedLabelId = ref<number | null>(null)

const editValue = ref<LabelDataTypes>({
  labelName: '',
  labelColor: '',
  labelId: 0
})

const emit = defineEmits(['updateLabels'])

const handleDeleteModal = (labelId: number | null) => {
  isModalVisible.value = !isModalVisible.value
  selectedLabelId.value = labelId
}

const handleColorModal = () => (isColorModalVisible.value = !isColorModalVisible.value)

const handleEdit = () => (isEdit.value = !isEdit.value)

const deleteLabel = async (labelId: number) => {
  await deleteLabelAdmin(labelId)
  emit('updateLabels')
  handleDeleteModal(0)
}

const clickColor = (labelId: number) => {
  handleColorModal()
  selectedLabelId.value = labelId
}

const startEdit = (label: LabelDataTypes) => {
  handleEdit()
  editValue.value = label
}

const updateLabelColor = (color: LabelColorTypes) => {
  editValue.value.labelColor = color.colorEnum
}

const finishEdit = async () => {
  handleEdit()
  await patchLabelAdmin(editValue.value)
  emit('updateLabels')
}
</script>
