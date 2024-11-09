import { useSignout as _useSignout } from '@/api/auth'
import { useStoreDispatch } from '@/store'

export const useSignout = () => {
  const signoutMutation = _useSignout()
  const dispatch = useStoreDispatch()
  const signOut = () => {
    signoutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch.user.setUser(undefined)
      },
    })
  }

  return { signOut }
}
