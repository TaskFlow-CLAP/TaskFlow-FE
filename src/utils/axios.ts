import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_API_BASE_URL

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
    error => {
      if (axios.isCancel(error)) {
        console.log('요청이 취소되었습니다:', error.message)
      } else if (error.response) {
        switch (error.response.status) {
          case 401:
            console.error('인증 오류: 다시 로그인하세요.')
            break
          case 403:
            console.error('권한 오류: 접근 권한이 없습니다.')
            break
          case 404:
            console.error('요청한 자원을 찾을 수 없습니다.')
            break
          case 500:
            console.error('서버 오류: 잠시 후 다시 시도하세요.')
            break
          default:
            console.error(`에러 발생: ${error.response.status}`)
        }
      } else {
        console.error('네트워크 오류: 서버에 연결할 수 없습니다.')
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
