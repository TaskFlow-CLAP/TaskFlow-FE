<template>
  <div class="w-full">
    <div
      v-for="main in categories"
      :key="main.mainCategoryId"
      class="flex w-full flex-col">
      <div
        v-for="sub in main.subCategory"
        :key="sub.subCategoryId"
        class="flex w-full flex-col">
        <div class="category-management-line justify-between bg-white">
          <div class="flex gap-4 items-center">
            <p class="text-xs font-semibold text-body w-[60px] text-center">{{ sub.code }}</p>
            <p>{{ sub.name }}</p>
          </div>
          <div class="flex gap-2 text-xs font-semibold">
            <button
              type="button"
              @click="router.push(`/category-second/${sub.subCategoryId}`)"
              class="text-primary1 hover:underline">
              수정
            </button>
            <button
              type="button"
              @click="openModal(sub.subCategoryId)"
              class="text-red-1 hover:underline">
              삭제
            </button>
          </div>
        </div>
        <ModalView
          type="warningType"
          :is-open="isModalVisible && selectedId === sub.subCategoryId"
          @click="deleteCategory(sub.subCategoryId)"
          @close="closeModal">
          <template #header>카테고리를 삭제 하시겠습니까?</template>
          <template #body>삭제된 카테고리는 복구할 수 없습니다</template>
        </ModalView>
      </div>
      <div
        class="category-management-line gap-1 justify-center cursor-pointer bg-white hover:bg-background-2"
        @click="MovetoAddSubCategory(main.mainCategoryId)">
        <CommonIcons :name="plusIcon" />
        <p class="text-xs text-disabled font-semibold">새 2차 카테고리 추가</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteCategoryAdmin } from '@/api/admin'
import { plusIcon } from '@/constants/iconPath'
import type { CategoryAllData } from '@/types/admin'
import { useQueryClient } from '@tanstack/vue-query'
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonIcons from '../common/CommonIcons.vue'
import ModalView from '../common/ModalView.vue'

const { categories } = defineProps<CategoryAllData>()
const router = useRouter()
const queryClient = useQueryClient()

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
  queryClient.invalidateQueries({ queryKey: ['category'] })
  closeModal()
}

const MovetoAddSubCategory = (id: number) => {
  router.push(`/category-second?mainCategoryId=${id}`)
}
</script>
