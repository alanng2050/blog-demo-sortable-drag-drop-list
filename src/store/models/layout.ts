import { createModel } from '@rematch/core'
import { RootModel } from '.'

type state = {
  expanded: boolean
  openMobileSidebar: boolean
}

export const layout = createModel<RootModel>()({
  state: { expanded: true, openMobileSidebar: false } as state, // initial state
  reducers: {
    toggleExpand(state, payload = false) {
      state.expanded = typeof payload === 'boolean' ? payload : !state.expanded
    },
    toggleMobileMenu(state, payload = false) {
      state.openMobileSidebar =
        typeof payload === 'boolean' ? payload : !state.openMobileSidebar
    },
  },
})
