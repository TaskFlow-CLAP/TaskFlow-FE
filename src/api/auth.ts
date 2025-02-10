import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'

import { useMemberStore } from '@/stores/member'

export const postPasswordEmailSend = async (name: string, email: string) => {
  const request = {
    name: name,
    email: email
  }
  const response = await axiosInstance.post('/api/new-password', request)
  return response.data
}

export const postPasswordCheck = async (password: string) => {
  const response = await axiosInstance.post('/api/members/password', { password: password })
  return response.data
}

export const postLogin = async (nickName: string, password: string) => {
  const response = await axiosInstance.post(`/api/auths/login?nickname=${nickName}`, {
    password: password
  })
  Cookies.set('accessToken', response.data.accessToken, {
    path: '/',
    sameSite: 'strict'
  })
  Cookies.set('refreshToken', response.data.refreshToken, {
    path: '/',
    sameSite: 'strict'
  })
  return response.data
}

export const patchPassword = async (password: string) => {
  const request = { password: password }
  const response = await axiosInstance.patch('/api/members/password', request)
  return response.data
}

export const deleteLogout = async () => {
  const memberStore = useMemberStore()
  memberStore.$reset()
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}
