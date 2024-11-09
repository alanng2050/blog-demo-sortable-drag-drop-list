import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react'
import MenuOpenIcon from '@material-design-icons/svg/filled/menu.svg'
import LogooutIcon from '@material-design-icons/svg/filled/logout.svg'
import ProfileIcon from '@material-design-icons/svg/filled/account_circle.svg'
import AccountIcon from '@material-design-icons/svg/filled/person.svg'
import { Link } from '@chakra-ui/next-js'
import { useTranslation } from 'next-i18next'
import { Logo } from '../AppBar/Logo'
import { AppBar } from '../AppBar'
import { DarkMode } from '../AppBar/DarkMode'
import { Lang } from '../AppBar/Lang'
import { useStoreDispatch } from '@/store'
import { useSignout } from '@/hooks/useSignout'
import { ROUTES } from '@/constants/route'

export const MyAppBar = () => {
  const dispatch = useStoreDispatch()
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const { signOut } = useSignout()
  const { t } = useTranslation()

  return (
    <AppBar
      sx={{
        bg: 'white',
      }}
    >
      {/* logo and menu button */}
      <HStack sx={{ pl: { base: 0, md: 5 } }} spacing={0}>
        <IconButton
          variant="unstyled"
          onClick={
            isMobile
              ? dispatch.layout.toggleMobileMenu
              : dispatch.layout.toggleExpand
          }
          aria-label="hide icon"
          sx={{
            width: '30px',
            mr: { base: 3, md: 5 },
            minWidth: 'auto',
            '& svg': {
              width: '30px',
              height: '30px',
            },
          }}
          icon={<MenuOpenIcon />}
        />
        <Logo />
        <HStack>
          <Link href="test">test</Link>
        </HStack>
      </HStack>
      <HStack
        spacing={0}
        sx={{
          '& .appbar-icon svg': {
            width: '30px',
            height: '30px',
          },
        }}
      >
        <DarkMode />
        <Lang />

        <Menu>
          <MenuButton
            sx={{ ml: 2, borderRadius: '50%', bg: 'primary' }}
            as={IconButton}
            aria-label="profile menu"
            icon={<AccountIcon />}
          />
          <MenuList
            sx={{
              minWidth: '150px',
              fontSize: 'sm',
              '& svg': {
                width: '20px',
                height: '20px',
              },
            }}
          >
            <MenuItem as={Link} href={ROUTES.profile} icon={<ProfileIcon />}>
              {t('menu-profile')}
            </MenuItem>
            <MenuItem onClick={signOut} icon={<LogooutIcon />}>
              {t('menu-signout')}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </AppBar>
  )
}
