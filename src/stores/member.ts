import { defineStore } from 'pinia'
import { axiosInstance } from '@/utils/axios'
import { ref } from 'vue'
import type { User } from '@/types/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export const useMemberStore = defineStore('memberInfo', () => {
  const INITIAL_INFO: User = {
    profileImageUrl: '',
    name: '',
    nickname: '',
    email: '',
    isReviewer: false,
    role: '',
    departmentName: '',
    departmentRole: ''
  }
  const info = ref<User>(INITIAL_INFO)

  const refreshToken = ref(Cookies.get('refreshToken') || '')
  const isLogined = ref(!!refreshToken.value)
  const router = useRouter()

  async function updateMemberInfoWithToken() {
    if (!Cookies.get('accessToken')) {
      router.push('/login')
      return
    }
    try {
      const { data }: { data: User } = await axiosInstance.get('/api/members/info')
      info.value = data
      isLogined.value = true
      return data.role
    } catch {
      router.push('/login')
    }
  }

  function logout() {
    $reset()
    isLogined.value = false
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }

  function $reset() {
    info.value = INITIAL_INFO
  }

  return {
    info,
    isLogined,
    updateMemberInfoWithToken,
    logout,
    $reset
  }
})
