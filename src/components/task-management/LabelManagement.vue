<template>
  <div
    class="flex flex-col w-full min-h-[240px] overflow-y-auto border border-border-1 rounded-lg bg-background-1">
    <div class="flex w-full">
      <div class="task-management-title rounded-tl-lg">
        <p>색상</p>
        <p>구분명</p>
      </div>
    </div>
    <div class="flex w-full">
      <LabelManagementLine :label-data="labelData" />
    </div>
    <div
      v-if="!isAdd"
      class="text-xs text-disabled gap-1 category-management-line justify-center cursor-pointer bg-white"
      @click="isAdd = true">
      <CommonIcons :name="plusIcon" />
      <p>새 구분 추가</p>
    </div>
    <div
      v-else
      class="category-management-line justify-between bg-white">
      <div class="flex w-full gap-7 items-center pl-3 relative">
        <div
          :style="{
            borderColor: getColor(newLabel.labelColor)?.borderColor,
            backgroundColor: getColor(newLabel.labelColor)?.fillColor
          }"
          class="w-4 h-4 rounded-full border-2 cursor-pointer pr-3"
          @click="handleColor"></div>
        <ColorSelectModal
          :is-open="isColorVisible"
          :newLabel
          @close="handleColor"
          @updateColor="updateLabelColor" />
        <input
          v-model="newLabel.labelName"
          type="text"
          placeholder="새로운 구분명을 입력"
          class="w-full flex focus:outline-none" />
      </div>
      <div class="flex gap-2 text-xs font-bold">
        <button
          @click="addNewLabel"
          class="text-primary1 w-[21px]">
          확인
        </button>
        <button
          @click="handleAdd"
          class="text-disabled w-[21px]">
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLabelsAdmin, postAddLabelAdmin } from '@/api/admin'
import { plusIcon } from '@/constants/iconPath'
import type { LabelDataTypes, NewLabelTypes } from '@/types/admin'
import type { LabelColorTypes } from '@/types/common'
import { getColor } from '@/utils/color'
import { onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ColorSelectModal from './ColorSelectModal.vue'
import LabelManagementLine from './LabelManagementLine.vue'

onMounted(async () => {
  const Labels = await getLabelsAdmin()
  labelData.value = Labels
})

const labelData = ref<LabelDataTypes[]>([])

const newLabel = ref<NewLabelTypes>({
  labelName: '',
  labelColor: 'RED'
})

const isColorVisible = ref(false)
const isAdd = ref(false)

const handleAdd = () => {
  isAdd.value = !isAdd.value
}

const handleColor = () => {
  isColorVisible.value = !isColorVisible.value
}

const updateLabelColor = (color: LabelColorTypes) => {
  newLabel.value.labelColor = color.colorEnum
}

const addNewLabel = () => {
  if (newLabel.value.labelName !== '') {
    postAddLabelAdmin(newLabel.value)
    handleAdd()
  }
}
</script>
