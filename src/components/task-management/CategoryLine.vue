<template>
  <div class="w-full">
    <div
      v-for="main in categories"
      :key="main.mainCategoryId"
      class="flex w-full flex-col">
      <div
        v-for="(sub, index) in (main.subCategory?.length || 0) + 1"
        :key="sub"
        class="category-management-line w-full justify-between bg-white">
        <template v-if="index === 0">
          <div
            v-if="index === 0"
            class="flex gap-4 items-center w-[200px]">
            <p class="text-xs text-body font-semibold w-[60px] text-center">{{ main.code }}</p>
            <p>{{ main.name }}</p>
          </div>
          <div class="flex gap-2 text-xs font-semibold">
            <button
              type="button"
              @click="router.push(`/category-first/${main.mainCategoryId}`)"
              class="text-primary3 hover:underline">
              수정
            </button>
            <button
              type="button"
              @click="openModal(main.mainCategoryId)"
              class="text-red-1 hover:underline">
              삭제
            </button>
          </div>
        </template>
        <template v-else>
          <div class="w-[200px]"></div>
        </template>
      </div>
    </div>
    <ModalView
      type="warningType"
      :is-open="isModalVisible"
      @click="handleDelete(selectedCategoryId)"
      @close="handleModal">
      <template #header>카테고리를 삭제 하시겠습니까?</template>
      <template #body>카테고리와 관련된 2차 카테고리도 모두 삭제됩니다</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { deleteCategoryAdmin } from '@/api/admin'
import type { CategoryAllData } from '@/types/admin'
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../common/ModalView.vue'
import { useQueryClient } from '@tanstack/vue-query'

const { categories } = defineProps<CategoryAllData>()
const router = useRouter()
const queryClient = useQueryClient()

const isModalVisible = ref(false)
const selectedCategoryId = ref<number | null>(null)

const handleModal = () => {
  isModalVisible.value = !isModalVisible.value
}

const openModal = (id: number) => {
  selectedCategoryId.value = id
  handleModal()
}

const handleDelete = async (id: number | null) => {
  if (id !== null) {
    await deleteCategoryAdmin(id)
    queryClient.invalidateQueries({ queryKey: ['category'] })
    handleModal()
  }
}
</script>
