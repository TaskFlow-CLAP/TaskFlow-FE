import type { MyRequestParams } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyRequestParamsStore = defineStore('myRequest', () => {
  const params = ref<MyRequestParams>({
    term: 0,
    mainCategory: [],
    category: [],
    title: '',
    nickName: '',
    taskStatus: [],
    pageSize: 20,
    pageNumber: 1,
    order: { target: 'REQUESTED_AT', type: 'DESC' }
  })

  return { params }
})
