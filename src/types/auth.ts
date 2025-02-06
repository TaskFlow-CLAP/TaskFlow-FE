export interface User {
  memberName: string
  nickname: string
  email: string
  imageUrl: string
  memberRole: string
  memberStatus: string
  departmentName: string
  departmentRole: string
  notificationSettingInfo: {
    agit: boolean
    email: boolean
    kakaoWork: boolean
  }
}

export interface loginDataTypes {
  nickname: string
  password: string
}
