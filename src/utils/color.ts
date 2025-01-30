import { COLOR_LIST } from '@/constants/common'

export const getColor = (color: string) => {
  switch (color.toLowerCase()) {
    case 'red':
      return COLOR_LIST[0]
    case 'orange':
      return COLOR_LIST[1]
    case 'yellow':
      return COLOR_LIST[2]
    case 'green':
      return COLOR_LIST[3]
    case 'blue':
      return COLOR_LIST[4]
    case 'indigo':
      return COLOR_LIST[5]
    case 'purple':
      return COLOR_LIST[6]
    case 'gray':
      return COLOR_LIST[7]
    default:
      return null
  }
}
