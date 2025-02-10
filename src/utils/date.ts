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
  if (dateStr === '') return null
  if (!timeStr) timeStr = '00:00'
  const date = new Date(`${dateStr}T${timeStr}:00`)
  const koreaOffset = 9 * 60
  const utcDate = new Date(date.getTime() + koreaOffset * 60 * 1000)
  return utcDate.toISOString()
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

  date.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffTime = today.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `${diffDays}일 초과`
  } else if (diffDays === 0) {
    return '오늘 마감'
  } else {
    return `${Math.abs(diffDays)}일 남음`
  }
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

export const formatFullDateTime = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const period = hours < 12 ? '오전' : '오후'
  hours = hours % 12 || 12

  return `${year}.${month}.${day} ${period} ${hours}:${minutes}:${seconds}`
}

export const isAfterNow = (dateString: string, timeString: string) => {
  const date = new Date(`${dateString}T${timeString}`)
  const now = new Date()

  return date > now
}

export const formatDateAndTime = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const period = hours < 12 ? '오전' : '오후'
  hours = hours % 12 || 12

  return `${year}.${month}.${day} ${period} ${hours}시 ${minutes}분`
}
