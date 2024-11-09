import { useRouter } from 'next/router'
import { Protected } from './Protected'
import { Public } from './Public'
import { ROUTES } from '@/constants/route'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const protectedRoutes = [ROUTES.dashboard, ROUTES.profile]

  if (protectedRoutes.includes(router.pathname))
    return <Protected>{children}</Protected>

  return <Public>{children}</Public>
}
