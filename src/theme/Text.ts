import { ComponentStyleConfig } from '@chakra-ui/react'

export const Text: ComponentStyleConfig = {
  baseStyle: {
    color: '#000',
    _dark: {
      color: '#fff',
    },
  },
  variants: {
    error: {
      fontSize: 'xs',
    },
  },
}
