/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'bg-gray-1',
    'bg-gray-2',
    'bg-blue-1',
    'bg-blue-2',
    'bg-orange-1',
    'bg-orange-2',
    'bg-green-1',
    'bg-green-2',
    'bg-red-1',
    'bg-red-2',
    'text-gray-1',
    'text-gray-2',
    'text-blue-1',
    'text-blue-2',
    'text-orange-1',
    'text-orange-2',
    'text-green-1',
    'text-green-2',
    'text-red-1',
    'text-red-2',
    'border-blue-1',
    'border-orange-1',
    'border-green-1'
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#7879EB',
        primary2: '#F7F9FF',
        black: '#18181B',
        body: '#71717A',
        disabled: '#A1A1AA',
        border: {
          1: '#D4D4D8',
          2: '#E4E4E7'
        },
        background: {
          1: '#E4E4E7',
          2: '#F4F4F5'
        },
        red: {
          1: '#DC2626',
          2: '#FEF2F2'
        },
        orange: {
          1: '#FB923C',
          2: '#FFF7ED'
        },
        yellow: {
          1: '#FACC15',
          2: '#FEFCE8'
        },
        green: {
          1: '#22C55E',
          2: '#F0FDF4'
        },
        blue: {
          1: '#3B82F6',
          2: '#EFF6FF'
        },
        indigo: {
          1: '#6366F1',
          2: '#EEF2FF'
        },
        violet: {
          1: '#8B5CF6',
          2: '#F5F3FF'
        },
        gray: {
          1: '#A1A1AA',
          2: '#F4F4F5'
        }
      }
    }
  },
  plugins: [scrollbarHide]
}
