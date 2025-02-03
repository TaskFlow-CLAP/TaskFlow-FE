export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export const formatDateWithDay = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'long' })

  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`
}

export const convertToISO = (dateStr: string, timeStr: string) => {
  const date = new Date(`${dateStr}T${timeStr}:00`)

  return date.toISOString()
}
