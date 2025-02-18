<template>
  <div class="py-1 px-2 rounded hover:bg-background-2">
    <input
      class="hidden"
      type="file"
      id="file"
      accept=".csv"
      ref="fileInput"
      @change="handleFileUpload" />
    <label
      for="file"
      class="cursor-pointer flex items-center gap-1 text-xs font-semibold text-primary3">
      <CommonIcons
        :name="plusIcon"
        :style="{ fill: '#7879EB' }" />
      파일로 일괄 추가
    </label>
    <ModalView
      :isOpen="isModalVisible === 'success'"
      :type="'successType'"
      @close="handleCancel">
      <template #header>회원이 추가되었습니다</template>
    </ModalView>
    <ModalView
      :isOpen="isModalVisible === 'error'"
      :type="'failType'"
      @close="handleCancel">
      <template #header>회원 추가를 실패했습니다</template>
      <template #body>{{ errorText }}</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { addMemberAdminByCsv } from '@/api/admin'
import { plusIcon } from '@/constants/iconPath'
import { useMemberManagementParamsStore } from '@/stores/params'
import { getErrorCSV } from '@/utils/getErorr'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ModalView from '../common/ModalView.vue'

const queryClient = useQueryClient()
const isModalVisible = ref('')
const { params } = useMemberManagementParamsStore()
const errorText = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileUpload = async (event: Event) => {
  try {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    await addMemberAdminByCsv(formData)

    queryClient.invalidateQueries({ queryKey: ['member', { ...params }] })
    isModalVisible.value = 'success'
  } catch (error) {
    errorText.value = getErrorCSV(error)
    isModalVisible.value = 'error'
  } finally {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const handleCancel = () => {
  isModalVisible.value = ''
  errorText.value = ''
}
</script>
