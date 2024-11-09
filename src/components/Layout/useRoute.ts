import DashboardIcon from '@material-design-icons/svg/filled/space_dashboard.svg'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ROUTES } from '@/constants/route'

export const useRoute = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const menu = [
    {
      name: t('menu-dashboard'),
      path: ROUTES.dashboard,
      icon: DashboardIcon,
      isActive: router.pathname === ROUTES.dashboard,
      className: '',
    },
  ].map((item) => {
    if (item.isActive) item.className = 'sidebar-item active'
    else item.className = 'sidebar-item'

    return item
  })

  return { menu }
}
