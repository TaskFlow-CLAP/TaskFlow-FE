import type { RequestParams } from '@/types/stores'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequestParamsStore = defineStore('requestParams', () => {
  const params = ref<RequestParams>({
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

  const $reset = () => {
    params.value.term = ''
    params.value.mainCategoryId = []
    params.value.categoryId = []
    params.value.title = ''
    params.value.nickName = ''
    params.value.taskStatus = []
    params.value.pageSize = 20
    params.value.page = 1
    params.value.orderRequest = { sortBy: 'REQUESTED', sortDirection: 'DESC' }
  }

  return { params, $reset }
})
