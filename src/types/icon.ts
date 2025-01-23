export interface IconPathTypes {
  path: string | string[]
  width: number
  height: number
  fill: string
  hoverFill?: string
  options?: IconOptions
}

interface IconOptions {
  stroke?: string
  strokeWidth?: number
  strokeLinecap?: 'round' | 'butt' | 'square' | 'inherit' | undefined
  strokeLinejoin?: 'round' | 'bevel' | 'miter' | 'inherit' | undefined
  fillRule?: 'evenodd' | 'inherit' | 'nonzero'
  clipRule?: 'evenodd' | 'inherit' | 'nonzero'
}

export interface IconProps {
  name: IconPathTypes
  className?: string
  onClick?: () => void
}
