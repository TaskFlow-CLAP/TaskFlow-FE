export type Role = 'manager' | 'user' | 'admin'

export interface MenuItemProps {
  menuId: number
  content: string
  role: Role
  link: string
}
