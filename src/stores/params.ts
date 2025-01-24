import type { RequestedParams, MyRequestParams } from '@/types/stores'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyRequestParamsStore = defineStore('myRequest', () => {
  const params = ref<MyRequestParams>({
    term: '',
    mainCategoryId: [],
    categoryId: [],
    title: '',
    nickName: '',
    taskStatus: [],
    pageSize: 20,
    page: 1,
    orderRequest: { sortBy: 'REQUESTED', sortDirection: 'DESC' }
  })

  return { params }
})

export const useRequestedParamsStore = defineStore('requested', () => {
  const params = ref<RequestedParams>({
    term: '',
    mainCategoryId: [],
    categoryId: [],
    title: '',
    nickName: '',
    pageSize: 20,
    page: 1,
    orderRequest: { sortBy: 'REQUESTED', sortDirection: 'DESC' }
  })

  return { params }
})
