// stores/memberStore.ts
import { defineStore } from 'pinia'
import axiosInstance from '@/utils/axios'
import { ref } from 'vue'
import type { User } from '@/types/auth'
import Cookies from 'js-cookie'

export const useMemberStore = defineStore('memberInfo', () => {
  const info = ref<User>({
    memberId: 0,
    memberName: '',
    nickname: '',
    imageUrl: '',
    memberRole: '',
    memberStatus: ''
  })

  // API 호출 후 회원 정보 업데이트
  async function updateMemberInfoWithToken() {
    try {
      const accessToken = Cookies.get('accessToken')

      if (!accessToken) {
        console.error('Access token is missing')
        return
      }

      const response = await axiosInstance.get('/api/members/info', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // 받은 데이터로 상태 업데이트
      console.log('API Response:', response.data)
      updateMemberInfo(response.data)
    } catch (error) {
      console.error('Error fetching member info:', error)
    }
  }

  // 상태 업데이트 함수
  function updateMemberInfo(responseData: any) {
    info.value = {
      memberId: 0,
      memberName: responseData.name || '',
      nickname: responseData.nicknanme || '',
      imageUrl: responseData.profileImageUrl || '',
      memberRole: responseData.role || '',
      memberStatus: ''
    }

    console.log('Updated member info:', info.value)
  }

  return {
    info,
    updateMemberInfo,
    updateMemberInfoWithToken
  }
})
