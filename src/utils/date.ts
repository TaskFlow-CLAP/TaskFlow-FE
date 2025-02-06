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
  if (dateStr === '' || timeStr === '') return null
  const date = new Date(`${dateStr}T${timeStr}:00`)
  return date.toISOString()
}

export const formatDueDate = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${year}년 ${month}월 ${day}일, ${hours}시 ${minutes}분까지`
}

export const formatDaysBefore = (dateString: string) => {
  const date = new Date(dateString)
  const today = new Date()

  const koreaOffset = 9 * 60 * 60 * 1000
  const koreaDate = new Date(date.getTime() + koreaOffset)
  const koreaToday = new Date(today.getTime() + koreaOffset)

  const diffTime = koreaDate.getTime() - koreaToday.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  return `${diffDays}일 남음`
}
export const formatTodayOrNot = (dateStr: string, timeStr: string) => {
  const inputDate = new Date(`${dateStr}T${timeStr}`)
  const today = new Date()

  const isSameDay = inputDate.toDateString() === today.toDateString()

  if (isSameDay) {
    return inputDate.toTimeString().slice(0, 5)
  } else {
    return `${inputDate.getMonth() + 1}월 ${inputDate.getDate()}일`
  }
}
