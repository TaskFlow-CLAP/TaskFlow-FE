<template>
  <div
    class="flex flex-col w-full h-[240px] overflow-hidden border border-border-1 rounded-lg bg-background-1">
    <div class="flex w-full">
      <div class="task-management-title rounded-tl-lg">
        <p>색상</p>
        <p>구분명</p>
      </div>
    </div>
    <div class="flex flex-col w-full grow overflow-y-auto scrollbar-hide pb-32">
      <LabelManagementLine
        :label-data="labelData"
        @updateLabels="fetchLabels" />
      <div
        v-if="!isAdd"
        class="w-full h-11 text-xs shrink-0 text-disabled gap-1 category-management-line justify-center cursor-pointer bg-white !border-b-0 hover:bg-background-2"
        @click="isAdd = true">
        <CommonIcons :name="plusIcon" />
        새 구분 추가
      </div>
      <div
        v-else
        class="category-management-line justify-between bg-white shrink-0">
        <div class="flex w-full gap-7 items-center px-3 relative">
          <div
            :style="{
              borderColor: getColor(newLabel.labelColor)?.borderColor,
              backgroundColor: getColor(newLabel.labelColor)?.fillColor
            }"
            class="w-4 h-4 rounded-full border-2 cursor-pointer pr-3"
            @click="handleColor"></div>
          <ColorSelectModal
            :is-open="isColorVisible"
            @close="handleColor"
            @updateColor="updateLabelColor" />
          <input
            v-model="newLabel.labelName"
            type="text"
            maxlength="10"
            placeholder="새로운 구분명을 입력"
            class="w-full flex focus:outline-none" />
          <p :class="['text-xs', { 'text-red-1': newLabel.labelName.length > 10 }]">
            {{ newLabel.labelName.length }}/10
          </p>
        </div>
        <div class="flex gap-2 text-xs font-semibold">
          <button
            type="button"
            @click="addNewLabel"
            class="text-primary1 w-[21px]">
            확인
          </button>
          <button
            type="button"
            @click="handleAdd"
            class="text-disabled w-[21px]">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { postAddLabelAdmin } from '@/api/admin'
import { getLabels } from '@/api/common'
import { plusIcon } from '@/constants/iconPath'
import type { NewLabelTypes } from '@/types/admin'
import type { LabelColorTypes, LabelDataTypes } from '@/types/common'
import { getColor } from '@/utils/color'
import { onMounted, ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ColorSelectModal from './ColorSelectModal.vue'
import LabelManagementLine from './LabelManagementLine.vue'

const labelData = ref<LabelDataTypes[]>([])
const newLabel = ref<NewLabelTypes>({
  labelName: '',
  labelColor: 'RED'
})

const isColorVisible = ref(false)
const isAdd = ref(false)

const fetchLabels = async () => {
  labelData.value = await getLabels()
}

onMounted(async () => {
  fetchLabels()
})

const handleAdd = () => {
  isAdd.value = !isAdd.value
  newLabel.value.labelName = ''
  newLabel.value.labelColor = 'RED'
}

const handleColor = () => {
  isColorVisible.value = !isColorVisible.value
}

const updateLabelColor = (color: LabelColorTypes) => {
  newLabel.value.labelColor = color.colorEnum
}

const addNewLabel = async () => {
  if (newLabel.value.labelName !== '' && newLabel.value.labelName.length <= 10) {
    await postAddLabelAdmin(newLabel.value)
    newLabel.value.labelName = ''
    handleAdd()
    fetchLabels()
  }
}
</script>
