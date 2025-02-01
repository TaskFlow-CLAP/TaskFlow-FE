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
      mainCategoryIds: [],
      categoryIds: [],
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
      mainCategoryIds: [],
      categoryIds: [],
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
    mainCategoryIds: [],
    categoryIds: []
  })

  return { params }
})

export const useTaskBoardParamsStore = defineStore('taskBoardParams', () => {
  const params = ref<TaskBoardParams>({
    division: '',
    mainCategoryIds: [],
    categoryIds: [],
    title: '',
    nickName: '',
    pageSize: 20,
    page: 1
  })

  return { params }
})
