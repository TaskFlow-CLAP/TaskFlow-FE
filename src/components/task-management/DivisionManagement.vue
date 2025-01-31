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
      <DivisionManagementLine :divisionData="divisionData" />
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
            borderColor: getColor(newDivision.divisionColor)?.borderColor,
            backgroundColor: getColor(newDivision.divisionColor)?.fillColor
          }"
          class="w-4 h-4 rounded-full border-2 cursor-pointer pr-3"
          @click="clickColor"></div>
        <ColorSelectModal
          v-if="isColorModalVisible"
          :is-open="isColorModalVisible"
          :devisionId="0"
          :selectedDivisionId="0"
          @close="closeColor" />
        <input
          type="text"
          placeholder="새로운 구분명을 입력"
          class="w-full flex focus:outline-none" />
      </div>
      <div class="flex gap-2 text-xs font-bold">
        <button
          @click="addNewDivision"
          class="text-primary1 w-[21px]">
          확인
        </button>
        <button
          @click="cancelAddDivision"
          class="text-disabled w-[21px]">
          취소
        </button>
      </div>
    </div>
    <div class="mt-4">
      <CategoryList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { plusIcon } from '@/constants/iconPath'
import { mockDivisionData } from '@/datas/taskmanagement'
import type { DivisionDataTypes, NewDevisonTypes } from '@/types/admin'
import { getColor } from '@/utils/color'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ColorSelectModal from './ColorSelectModal.vue'
import DivisionManagementLine from './DivisionManagementLine.vue' /* PartiallyEnd: #3632/scriptSetup.vue */

const divisionData = ref<DivisionDataTypes[]>(mockDivisionData)
const newDivision = ref<NewDevisonTypes>({
  divisionName: '새로운 구분',
  divisionColor: 'red'
})
const isColorModalVisible = ref(false)
const isAdd = ref(false)

const addNewDivision = () => {
  console.log(newDivision, '추가로직')
  isAdd.value = false
}

const cancelAddDivision = () => {
  isAdd.value = false
}

const closeColor = () => {
  isColorModalVisible.value = false
}

const clickColor = () => {
  isColorModalVisible.value = true
}
</script>
