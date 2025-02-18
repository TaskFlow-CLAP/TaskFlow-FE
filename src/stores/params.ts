import type {
  LogsParams,
  MemberManagementParams,
  RequestParams,
  TaskBoardParams,
  TeamBoardParams
} from '@/types/stores'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

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

  watch(
    () => ({
      pageSize: params.value.pageSize,
      term: params.value.term,
      mainCategoryIds: params.value.mainCategoryIds,
      categoryIds: params.value.categoryIds,
      title: params.value.title,
      nickName: params.value.nickName,
      taskStatus: params.value.taskStatus,
      sortBy: params.value.sortBy,
      sortDirection: params.value.sortDirection
    }),
    () => {
      params.value.page = 0
    },
    { deep: true }
  )

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
    email: '',
    nickName: '',
    departmentName: '',
    role: '',
    sortDirection: 'DESC'
  })

  watch(
    () => ({
      pageSize: params.value.pageSize,
      name: params.value.name,
      email: params.value.email,
      nickName: params.value.nickName,
      departmentName: params.value.departmentName,
      role: params.value.role,
      sortDirection: params.value.sortDirection
    }),
    () => {
      params.value.page = 0
    },
    { deep: true }
  )

  return { params }
})

export const useLogsParamsStore = defineStore('logsParams', () => {
  const params = ref<LogsParams>({
    page: 0,
    pageSize: 20,
    term: '',
    logStatus: [],
    nickName: '',
    clientIp: '',
    sortDirection: 'DESC'
  })

  watch(
    () => ({
      pageSize: params.value.pageSize,
      term: params.value.term,
      logStatus: params.value.logStatus,
      nickName: params.value.nickName,
      clientIp: params.value.clientIp,
      sortDirection: params.value.sortDirection
    }),
    () => {
      params.value.page = 0
    },
    { deep: true }
  )

  const $reset = () => {
    params.value.page = 0
    params.value.pageSize = 20
    params.value.term = ''
    params.value.logStatus = []
    params.value.nickName = ''
    params.value.clientIp = ''
    params.value.sortDirection = 'DESC'
  }

  return { params, $reset }
})

export const useTeamBoardParamsStore = defineStore('teamBoardParams', () => {
  const params = ref<TeamBoardParams>({
    sortBy: 'CONTRIBUTE',
    mainCategoryIds: [],
    categoryIds: [],
    taskTitle: ''
  })

  const $reset = () => {
    params.value.sortBy = 'CONTRIBUTE'
    params.value.mainCategoryIds = []
    params.value.categoryIds = []
    params.value.taskTitle = ''
  }

  return { params, $reset }
})

export const useTaskBoardParamsStore = defineStore('taskBoardParams', () => {
  const params = ref<TaskBoardParams>({
    labelId: '',
    mainCategoryIds: [],
    categoryIds: [],
    title: '',
    requesterNickname: ''
  })

  const $reset = () => {
    params.value.labelId = ''
    params.value.mainCategoryIds = []
    params.value.categoryIds = []
    params.value.title = ''
    params.value.requesterNickname = ''
  }

  return { params, $reset }
})
