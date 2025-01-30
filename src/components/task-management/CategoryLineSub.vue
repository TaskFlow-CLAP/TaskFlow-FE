<template>
  <div class="w-full">
    <div
      v-for="main in mainCategory"
      :key="main.id"
      class="flex w-full flex-col">
      <div class="category-management-line justify-between">
        <div
          v-for="sub in subCategory"
          :key="sub.id">
          <div
            v-if="sub.mainCategoryId === main.id"
            class="flex gap-4">
            <p class="text-xs font-bold text-body">{{ sub.code }}</p>
            <p class="text-black">{{ sub.name }}</p>
          </div>
          <div
            v-if="sub.mainCategoryId === main.id"
            class="flex gap-2 text-xs font-bold">
            <button
              @click="router.push('수정경로')"
              class="text-primary1">
              수정
            </button>
            <button
              @click="handleDelete"
              class="text-red-1">
              삭제 {{ sub.id }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalView
      type="warningType"
      :is-open="isModalVisible"
      @close="handleCancel()">
      <template #header>카테고리를 삭제 하시겠습니까?</template>
      <template #body>삭제된 카테고리는 복구할 수 없습니다</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import type { CategoryAllData } from '@/types/admin'
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalView from '../ModalView.vue'

const { mainCategory, subCategory } = defineProps<CategoryAllData>()
const router = useRouter()

const isModalVisible = ref(false)

const handleCancel = () => {
  isModalVisible.value = false
}

const handleDelete = () => {
  isModalVisible.value = true
}
</script>
