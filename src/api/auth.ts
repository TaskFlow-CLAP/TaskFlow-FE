import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'

import { useMemberStore } from '@/stores/member'

export const postPasswordEmailSend = async (name: string, email: string, id: string) => {
  const request = {
    name: name,
    email: email
  }
  const response = await axiosInstance.post(`/api/new-password?nickname=${id}`, request)
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
  if (response.data.refreshToken) {
    Cookies.set('refreshToken', response.data.refreshToken, {
      path: '/',
      sameSite: 'strict'
    })
  }
  return response.data
}

export const patchPassword = async (password: string) => {
  const request = { password }
  const refreshToken = Cookies.get('refreshToken')
  if (refreshToken) {
    const response = await axiosInstance.patch('/api/members/password', request)
    return response.data
  } else {
    const response = await axiosInstance.patch('/api/members/initial-password', request)
    return response.data
  }
}

export const deleteLogout = async () => {
  const memberStore = useMemberStore()
  memberStore.$reset()
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}
