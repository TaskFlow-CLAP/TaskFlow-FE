<template>
  <div class="w-full">
    <div
      v-for="main in categories"
      :key="main.id"
      class="flex w-full flex-col">
      <div
        v-for="sub in main.subCategory"
        :key="sub.id"
        class="flex w-full flex-col">
        <div class="category-management-line justify-between bg-white">
          <div class="flex gap-4 items-center">
            <p class="text-xs font-bold text-body w-[60px] text-center">{{ sub.code }}</p>
            <p class="text-black">{{ sub.name }}</p>
          </div>
          <div class="flex gap-2 text-xs font-bold">
            <button
              @click="router.push('수정경로')"
              class="text-primary1">
              수정
            </button>
            <button
              @click="openModal(sub.id)"
              class="text-red-1">
              삭제
            </button>
          </div>
        </div>
        <ModalView
          type="warningType"
          :is-open="isModalVisible && selectedId === sub.id"
          @click="deleteCategory(sub.id)"
          @close="closeModal">
          <template #header>카테고리를 삭제 하시겠습니까?</template>
          <template #body>삭제된 카테고리는 복구할 수 없습니다</template>
        </ModalView>
      </div>
      <div
        class="category-management-line gap-1 justify-center cursor-pointer bg-white"
        @click="MovetoAddSubCategory">
        <CommonIcons :name="plusIcon" />
        <p class="text-xs text-disabled font-bold">새 2차 카테고리 추가</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteCategoryAdmin } from '@/api/admin'
import { plusIcon } from '@/constants/iconPath'
import type { CategoryAllData } from '@/types/admin'
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../ModalView.vue'
import CommonIcons from '../common/CommonIcons.vue'

const { categories } = defineProps<CategoryAllData>()
const router = useRouter()

const isModalVisible = ref(false)
const selectedId = ref<number | null>(null)

const openModal = (id: number) => {
  selectedId.value = id
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
  selectedId.value = null
}

const deleteCategory = async (id: number) => {
  await deleteCategoryAdmin(id)
  closeModal()
}

const MovetoAddSubCategory = () => {
  router.push('/category-second')
}
</script>
