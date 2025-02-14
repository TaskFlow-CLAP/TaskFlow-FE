export const getErrorCSV = (error: unknown): string => {
  if (!(error instanceof Error)) return '알 수 없는 오류가 발생했습니다'

  const errorMessages: Record<string, string> = {
    WRONG_FILETYPE: 'csv 파일만 업로드 가능합니다',
    MEMBER_DUPLICATED: '중복된 닉네임이나 이메일이 존재합니다',
    MEMBER_REVIEWER: '담당자 권한이 없는 부서입니다',
    NICKNAME_EMAIL_DIFFERENT: '닉네임과 이메일이 일치하지 않습니다',
    NO_DEPARTMENT: '부서를 찾을 수 없습니다',
    PARSSING_ERROR: 'CSV 데이터 파싱 중 오류가 발생했습니다',
  }

  return errorMessages[error.message] || '알 수 없는 오류가 발생했습니다'
}
