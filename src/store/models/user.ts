import { createModel } from '@rematch/core'
import { RootModel } from '.'
import { fetchUser } from '@/api/user'

type state = {
  isLoading: boolean
  user?: User
}

export const user = createModel<RootModel>()({
  state: { isLoading: true, user: undefined } as state, // initial state
  reducers: {
    setUser(state, user?: User) {
      state.user = user
    },
    setLoading(state, loading: boolean) {
      state.isLoading = loading
    },
  },
  effects: (dispatch) => ({
    async fetchUser() {
      try {
        const user = await fetchUser()
        dispatch.user.setUser(user)
      } catch {
        //do nothing
      } finally {
        dispatch.user.setLoading(false)
      }
    },
  }),
})
