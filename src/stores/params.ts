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
    term: '',
    mainCategoryIds: [],
    categoryIds: [],
    title: '',
    nickName: '',
    taskStatus: [],
    sortBy: 'REQUESTED_AT',
    sortDirection: 'DESC'
  })

  const $reset = () => {
    params.value.page = 0
    params.value.pageSize = 20
    params.value.term = ''
    params.value.mainCategoryIds = []
    params.value.categoryIds = []
    params.value.title = ''
    params.value.nickName = ''
    params.value.taskStatus = []
    params.value.sortBy = 'REQUESTED_AT'
    params.value.sortDirection = 'DESC'
  }

  return { params, $reset }
})

export const useMemberManagementParamsStore = defineStore('userManagementParams', () => {
  const params = ref<MemberManagementParams>({
    page: 0,
    pageSize: 20,
    name: '',
    nickName: '',
    department: '',
    email: '',
    role: '',
    sortBy: 'REGISTERED_AT',
    sortDirection: 'DESC'
  })

  return { params }
})

export const useLogsParamsStore = defineStore('logsParams', () => {
  const params = ref<LogsParams>({
    page: 0,
    pageSize: 20,
    term: '',
    logStatus: [],
    nickName: '',
    clientIp: ''
    // sortBy: 'CREATED_AT',
    // sortDirection: 'DESC'
  })

  const $reset = () => {
    params.value.page = 0
    params.value.pageSize = 20
    params.value.term = ''
    params.value.logStatus = []
    params.value.nickName = ''
    params.value.clientIp = ''
    // params.value.sortBy = 'CREATED_AT'
    // params.value.sortDirection = 'DESC'
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
