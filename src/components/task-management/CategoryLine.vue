<template>
  <div class="w-full">
    <div
      v-for="main in categories"
      :key="main.id"
      class="flex w-full flex-col">
      <div
        v-for="(sub, index) in main.subCategory.length + 1"
        :key="sub"
        class="category-management-line w-full justify-between">
        <template v-if="index === 0">
          <div
            v-if="index === 0"
            class="flex gap-4 items-center w-[200px]">
            <p class="text-xs text-body w-[60px] text-center">{{ main.code }}</p>
            <p class="text-black">{{ main.name }}</p>
          </div>
          <div class="flex gap-2 text-xs font-bold">
            <button
              @click="router.push('수정경로')"
              class="text-primary1">
              수정
            </button>
            <button
              @click="handleDelete(main.id)"
              class="text-red-1">
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

const { categories } = defineProps<CategoryAllData>()
const router = useRouter()

const isModalVisible = ref(false)

const handleCancel = () => {
  isModalVisible.value = false
}

const handleDelete = (id: number) => {
  isModalVisible.value = true
  console.log(id, '삭제로직')
}
</script>
