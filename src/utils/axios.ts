import { useErrorStore } from '@/stores/error'
import { useMemberStore } from '@/stores/member'
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { redirectToLogin } from './redirectToLogin'

const baseURL = import.meta.env.VITE_API_BASE_URL

const getNewAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken')
    const response = await axios.post(
      baseURL + '/api/auths/reissuance',
      {},
      {
        headers: { refreshToken: refreshToken }
      }
    )
    Cookies.set('accessToken', response.data.accessToken)
    Cookies.set('refreshToken', response.data.refreshToken)

    return response.data.accessToken
  } catch {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }
}
const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== 'undefined') {
        const token = Cookies.get('accessToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    error => Promise.reject(error)
  )

  instance.interceptors.response.use(
    response => response,
    async error => {
      const { setError } = useErrorStore()
      if (axios.isCancel(error)) {
        setError('요청이 취소되었습니다:', error.message)
      } else if (error.response) {
        switch (error.response.status) {
          case 401:
            if (error.response.data === 'AUTH_003') {
              Cookies.remove('refreshToken')
              setError('유효하지 않은 토큰입니다', '다시 로그인 해주세요', redirectToLogin)
            }
            break
          case 403: {
            if (error.response.data !== 'AUTH_002') {
              const memberStore = useMemberStore()
              const { isLogined } = storeToRefs(memberStore)
              isLogined.value = false

              const originalRequest = error.config
              if (!originalRequest._retry) {
                originalRequest._retry = true

                try {
                  const newAccessToken = await getNewAccessToken()
                  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                  isLogined.value = true
                  return instance(originalRequest)
                } catch {
                  setError('토큰 갱신에 실패하였습니다', '다시 로그인 해주세요', redirectToLogin)
                }
              }
            }
            break
          }
          case 400:
            if (error.response.data === 'TASK_013') {
              setError('중복된 카테고리명\n혹은 고유코드입니다')
            } else if (error.response.data === 'MEMBER_006') {
              setError('비밀번호가 일치하지 않습니다', '다시 시도해주세요')
            } else if (error.response.data === 'MEMBER_007') {
              return Promise.reject(new Error('WRONG_FILETYPE'))
            } else if (error.response.data === 'MEMBER_012') {
              return Promise.reject(new Error('MEMBER_DUPLICATED'))
            } else if (error.response.data === 'MEMBER_013') {
              return Promise.reject(new Error('MEMBER_REVIEWER'))
            } else if (error.response.data === 'MEMBER_014') {
              return Promise.reject(new Error('NICKNAME_EMAIL_DIFFERENT'))
            } else if (error.response.data === 'MEMBER_016') {
              return Promise.reject(new Error('WRONG_NICKNAME'))
            } else {
              setError('잘못된 요청입니다', '다시 시도해주세요')
            }
            break
          case 404:
            if (error.response.data === 'MEMBER_001') {
              setError('일치하는 정보가 없습니다', '이메일과 이름을 다시 확인해주세요')
            } else if (error.response.data === 'DEPARTMENT_001') {
              return Promise.reject(new Error('NO_DEPARTMENT'))
            } else {
              setError('요청한 자원을 찾을 수 없습니다')
            }
            break
          case 500:
            if (error.response.data === 'MEMBER_008') {
              return Promise.reject(new Error('PARSSING_ERROR'))
            } else {
              setError('서버 오류', '잠시 후 다시 시도해주세요')
            }
            break
          default:
            setError('에러 발생', `${error.response.status}`)
        }
      } else {
        setError('네트워크 오류', '서버에 연결할 수 없습니다')
      }
      return Promise.reject(error)
    }
  )
}

const createAxiosInstance = (contentType: string) => {
  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': contentType,
      Accept: 'application/json'
    }
  })
  setInterceptors(instance)
  return instance
}

const axiosInstance = createAxiosInstance('application/json')

const formDataAxiosInstance = createAxiosInstance('multipart/form-data')

export { axiosInstance, formDataAxiosInstance }
