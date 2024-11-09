import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import VNIcon from '@/components/Icon/vn.svg'
import USAIcon from '@/components/Icon/usa.svg'

export const Lang = () => {
  const { t, i18n } = useTranslation()

  const icon = i18n.language === 'vi' ? <VNIcon /> : <USAIcon />

  const onChange = (lng: Language) => {
    if (i18n.language === lng) return

    const { pathname, origin, search } = window.location
    if (lng === 'en')
      window.location.href = window.location.href.replace('/vi', '')
    else window.location.href = `${origin}/vi/${pathname}${search}`
  }

  return (
    <Menu>
      <MenuButton
        sx={{
          ml: 2,
          borderRadius: '50%',
          bg: 'primary',
          '& svg': {
            width: '20px',
            height: '20px',
          },
        }}
        as={IconButton}
        aria-label="profile menu"
        icon={icon}
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
        <MenuItem onClick={() => onChange('en')} icon={<USAIcon />}>
          {t('lang-menu-en')}
        </MenuItem>
        <MenuItem onClick={() => onChange('vi')} icon={<VNIcon />}>
          {t('lang-menu-vi')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
