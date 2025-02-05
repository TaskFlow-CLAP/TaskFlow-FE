<template>
  <div class="flex gap-4">
    <FilterInput
      title="이름"
      :value="params.name"
      @update:value="value => (params.name = value)" />
    <FilterInput
      title="아이디"
      :value="params.nickName"
      @update:value="value => (params.nickName = value)" />
    <FilterInput
      title="부서"
      :value="String(params.departmentName)"
      @update:value="value => (params.departmentName = value)" />
    <FilterInput
      title="이메일"
      width="full"
      :value="params.email"
      @update:value="value => (params.email = value)" />
    <FilterDropdown
      title="역할"
      :option-list="ROLE_LIST"
      :value="params.role"
      @update:value="value => (params.role = value)" />
    <FilterDropdown
      title="페이지 당 개수"
      :option-list="PAGE_SIZE_LIST"
      :value="String(params.pageSize)"
      @update:value="value => (params.pageSize = Number(value))" />
  </div>
</template>

<script setup lang="ts">
import { useMemberManagementParamsStore } from '@/stores/params'
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'
import { PAGE_SIZE_LIST, ROLE_LIST } from '@/constants/common'

const { params } = useMemberManagementParamsStore()
</script>
