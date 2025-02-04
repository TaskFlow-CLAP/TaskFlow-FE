import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'
import type { loginDataTypes } from '@/types/auth'

export const postLogin = async (loginData: loginDataTypes, sessionId: string) => {
  const response = await axiosInstance.post('/api/auths/login', loginData, {
    headers: { sessionId: sessionId }
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
  const response = await axiosInstance.patch('/api/members/password', password)

  return response.data
}

export const deleteLogout = async () => {
  const refreshToken = Cookies.get('refreshToken')

  const response = await axiosInstance.delete('/api/auths/logout', {
    headers: {
      refreshToken: refreshToken
    }
  })
  Cookies.remove('accessToken', { path: '/' })
  Cookies.remove('refreshToken', { path: '/' })
  return response
}
