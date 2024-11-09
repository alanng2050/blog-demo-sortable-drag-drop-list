import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from './useUser'

// redirect if user already signed in
export const useRedirect = ({ path }: { path: string }) => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push(path)
  }, [path, router, user])
}
