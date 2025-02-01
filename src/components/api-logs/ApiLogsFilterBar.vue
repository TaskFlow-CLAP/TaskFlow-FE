<template>
  <div class="flex gap-4">
    <FilterDropdown
      title="조회 기간"
      :option-list="TERM_LIST"
      :value="String(store.params.term)"
      @update:value="onParamsChange.onTermChange" />
    <FilterDropdownMulti
      title="구분"
      :option-list="LOGIN_LOGS_DIVISION_LIST"
      :value="store.params.logStatus"
      @update:value="onParamsChange.onLogStatusChange" />
    <FilterInput
      title="아이디"
      width="full"
      :value="store.params.nickName"
      @update:value="onParamsChange.onNickNameChange" />
    <FilterIpAddress @update:value="onParamsChange.onClientIpChange" />
    <FilterDropdown
      title="페이지 당 개수"
      :option-list="PAGE_SIZE_LIST"
      :value="String(store.params.pageSize)"
      @update:value="onParamsChange.onPageSizeChange" />
  </div>
</template>

<script setup lang="ts">
import FilterDropdown from '../filters/FilterDropdown.vue'
import FilterInput from '../filters/FilterInput.vue'
import { useLogsParamsStore } from '@/stores/params'
import { PAGE_SIZE_LIST, TERM_LIST } from '@/constants/common'
import { LOGIN_LOGS_DIVISION_LIST } from '@/constants/admin'
import { useLogsParamsChange } from '../hooks/useLogsParamsChange'
import FilterIpAddress from '../filters/FilterIpAddress.vue'
import FilterDropdownMulti from '../filters/FilterDropdownMulti.vue'

const store = useLogsParamsStore()
store.$reset()

const onParamsChange = useLogsParamsChange()
</script>
