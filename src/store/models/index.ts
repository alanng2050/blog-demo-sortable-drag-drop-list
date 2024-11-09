import { Models } from '@rematch/core'
import { user } from './user'
import { layout } from './layout'

export interface RootModel extends Models<RootModel> {
  user: typeof user
  layout: typeof layout
}

export const models: RootModel = { user, layout }
