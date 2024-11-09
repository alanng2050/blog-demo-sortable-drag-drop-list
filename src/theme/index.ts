import { extendTheme } from '@chakra-ui/react'
import { defaultTheme } from '@tinychange/chakra-hook-form'
import { fonts } from './fonts'
import { config } from './config'
import { Text } from './Text'
import { colorMode } from './colorMode'
import { Button } from './Button'
import { space } from './space'
import { radii } from './borderRadius'
import { Flex } from './Flex'
import { layerStyles } from './layerStyles'
import { Input } from './Input'
import { FormLabel } from './FormLabel'
import { styles } from './globalStyles'
import { Alert } from './Alert'
import { Table } from './Table'

export const theme = extendTheme(defaultTheme, {
  config,
  fonts,
  space,
  radii,
  styles,
  semanticTokens: {
    colors: colorMode,
  },
  layerStyles,
  components: {
    Table,
    Alert,
    FormLabel,
    Text,
    Button,
    Flex,
    Input,
    Link: {
      baseStyle: {
        _hover: {
          textDecor: 'none',
        },
      },
    },
  },
})
