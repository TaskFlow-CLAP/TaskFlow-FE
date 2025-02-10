<template>
  <div class="py-1 px-2 rounded">
    <input
      class="hidden"
      type="file"
      id="file"
      accept=".csv"
      @change="handleFileUpload" />
    <label
      for="file"
      class="cursor-pointer flex items-center gap-1 text-xs font-bold text-primary1">
      <CommonIcons
        :name="plusIcon"
        :style="{ fill: '#7879EB' }" />
      파일로 일괄 추가
    </label>
    <ModalView
      :isOpen="isModalVisible"
      :type="'successType'"
      @close="handleCancel">
      <template #header>회원이 추가되었습니다</template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { addMemberAdminByCsv } from '@/api/admin'
import { plusIcon } from '@/constants/iconPath'
import { useMemberManagementParamsStore } from '@/stores/params'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import ModalView from '../common/ModalView.vue'

const queryClient = useQueryClient()
const isModalVisible = ref(false)
const { params } = useMemberManagementParamsStore()

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  await addMemberAdminByCsv(formData)
  queryClient.invalidateQueries({ queryKey: ['member', { ...params }] })
  isModalVisible.value = true
  target.value = ''
}

const handleCancel = () => {
  isModalVisible.value = false
}
</script>
