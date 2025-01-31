import type {
  LogsParams,
  MemberManagementParams,
  RequestParams,
  TeamBoardParams,
  TaskBoardParams
} from '@/types/stores'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRequestParamsStore = defineStore('requestParams', () => {
  const params = ref<RequestParams>({
    page: 0,
    pageSize: 20,
    filterTaskListRequest: {
      term: '',
      mainCategoryId: [],
      categoryId: [],
      title: '',
      nickName: '',
      taskStatus: [],
      orderRequest: { sortBy: 'REQUESTED', sortDirection: 'DESC' }
    }
  })

  const $reset = () => {
    params.value.page = 0
    params.value.pageSize = 20
    params.value.filterTaskListRequest = {
      term: '',
      mainCategoryId: [],
      categoryId: [],
      title: '',
      nickName: '',
      taskStatus: [],
      orderRequest: { sortBy: 'REQUESTED', sortDirection: 'DESC' }
    }
  }

  return { params, $reset }
})

export const useMemberManagementParamsStore = defineStore('userManagementParams', () => {
  const params = ref<MemberManagementParams>({
    name: '',
    nickName: '',
    department: '',
    email: '',
    role: '',
    pageSize: 20,
    page: 1,
    orderRequest: { sortBy: 'REGISTERED', sortDirection: 'DESC' }
  })

  return { params }
})

export const useLogsParamsStore = defineStore('logsParams', () => {
  const params = ref<LogsParams>({
    term: '',
    division: '',
    nickName: '',
    ipAddress: '',
    pageSize: 20,
    page: 1,
    orderRequest: { sortBy: 'CREATED', sortDirection: 'DESC' }
  })

  const $reset = () => {
    params.value.term = ''
    params.value.division = ''
    params.value.nickName = ''
    params.value.ipAddress = ''
    params.value.pageSize = 20
    params.value.page = 1
    params.value.orderRequest = { sortBy: 'CREATED', sortDirection: 'DESC' }
  }

  return { params, $reset }
})

export const useTeamBoardParamsStore = defineStore('teamBoardParams', () => {
  const params = ref<TeamBoardParams>({
    order: 'CONTRIBUTION',
    title: '',
    mainCategoryId: [],
    categoryId: []
  })

  return { params }
})

export const useTaskBoardParamsStore = defineStore('taskBoardParams', () => {
  const params = ref<TaskBoardParams>({
    division: '',
    mainCategoryId: [],
    categoryId: [],
    title: '',
    nickName: '',
    pageSize: 20,
    page: 1
  })

  return { params }
})
