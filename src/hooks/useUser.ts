import { useStoreState } from '@/store'

export const useUser = () => {
  const isLoading = useStoreState((s) => s.user.isLoading)
  const user = useStoreState((s) => s.user.user)

  return { isLoading, user }
}
