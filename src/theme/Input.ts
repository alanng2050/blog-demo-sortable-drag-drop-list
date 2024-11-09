import { ComponentStyleConfig } from '@chakra-ui/react'

export const Input: ComponentStyleConfig = {
  variants: {
    outline: {
      field: {
        background: 'white',
        fontSize: 'sm',
        _dark: {
          background: 'none',
        },
      },
    },
  },
  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
}
