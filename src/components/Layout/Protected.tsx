import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Loading } from '../Loading'
import { MyAppBar } from './MyAppBar'
import { SideBar } from './SideBar'
import { useUser } from '@/hooks/useUser'
import { ROUTES } from '@/constants/route'

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) router.push(ROUTES.signin)
  }, [user, isLoading, router])

  if (!user) return <Loading />

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgColor: '#fff',
      }}
    >
      <MyAppBar />
      <Flex>
        <SideBar />
        <Box
          sx={{
            width: '100%',
            overflow: 'hidden',
            flexGrow: 1,
            p: {
              base: 4,
              lg: 6,
            },
          }}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
