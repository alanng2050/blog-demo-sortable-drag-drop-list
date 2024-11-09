import { ComponentStyleConfig } from '@chakra-ui/react'

const shareStyles = {
  bg: '#fff',
  fontSize: 'sm',
  fontWeight: 'normal',
  _hover: {
    bg: 'primary',
  },
  _active: {
    bg: 'primary',
  },
}

export const Button: ComponentStyleConfig = {
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
  baseStyle: {
    bg: '#fff',
    fontSize: 'sm',
    fontWeight: 'normal',
    _hover: {
      bg: 'primary',
    },
    _active: {
      bg: 'primary',
    },

    _dark: {
      bg: 'none',
    },
  },
  variants: {
    icon: {
      bg: 'none',
      _hover: {
        bg: 'none',
      },
    },
    link: {
      bg: 'none',
      _hover: {
        textDecor: 'none',
        bg: 'none',
      },
      _active: {
        bg: 'none',
      },
    },
    ghost: shareStyles,
    outline: shareStyles,
  },
}
