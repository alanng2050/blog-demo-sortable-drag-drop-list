import { alphaHex } from '@/utils/alphaHex'

export const colorMode = {
  error: 'red.500',
  success: 'green.500',
  mainBg: {
    default: '#f6f3f1',
    _dark: 'blue',
  },
  primary: {
    default: '#eae3dd',
  },
  hover: {
    default: alphaHex('#eae3dd', 0.3),
    _dark: 'blackAlpha.700',
  },
  second: '#441f1d',
  gray: '#5d5d5d',

  color1: '#b1998a0d',
  color2: '#733b01',
  color3: '#7e7c7c',

  icon: '#6c564d',
}
