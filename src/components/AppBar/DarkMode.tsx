import { IconButton, useColorMode } from '@chakra-ui/react'
import DarkIcon from '@material-design-icons/svg/filled/dark_mode.svg'
import LightIcon from '@material-design-icons/svg/filled/light_mode.svg'

export const DarkMode = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <IconButton
      sx={{ display: 'none' }}
      onClick={toggleColorMode}
      aria-label="mode"
      variant={'icon'}
      className="appbar-icon"
      icon={colorMode === 'dark' ? <LightIcon /> : <DarkIcon />}
    />
  )
}
