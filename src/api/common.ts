import { useMemberStore } from '@/stores/member'
import { axiosInstance, formDataAxiosInstance } from '../utils/axios'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'

setActivePinia(createPinia())

const memberStore = useMemberStore()
const { isLogined } = storeToRefs(memberStore)

export const patchEditInfo = async (formdata: FormData) => {
  if (!isLogined) return
  const response = await formDataAxiosInstance.patch('/api/members/info', formdata)
  return response.data
}

export const getNotification = async (pageNum: number, sizeNum: number) => {
  if (!isLogined) return
  const response = await axiosInstance.get(`/api/notifications?page=${pageNum}&size=${sizeNum}`)
  return response.data
}

export const patchNotificationRead = async (notificationId: number) => {
  if (!isLogined) return
  const response = await axiosInstance.patch(`/api/notifications/${notificationId}`)
  return response.data
}

export const getNotifiCount = async () => {
  if (!isLogined) return
  const response = await axiosInstance.get(`/api/notifications/count`)
  return response.data
}

export const getMainCategory = async () => {
  if (!isLogined) return
  const response = await axiosInstance.get('/api/main-category')
  return response.data
}

export const getSubCategory = async () => {
  if (!isLogined) return
  const response = await axiosInstance.get('/api/sub-category')
  return response.data
}

export const getLabels = async () => {
  if (!isLogined) return
  const response = await axiosInstance.get('/api/labels')
  return response.data
}

export const getCategory = async () => {
  if (!isLogined) return
  const response = await axiosInstance.get('/api/category')
  return response.data
}
