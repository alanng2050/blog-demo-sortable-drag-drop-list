import { BigNumber } from 'bignumber.js'
export const formatNumber = (val?: BigNumber.Value) =>
  new BigNumber(val || '0').dp(7).toFormat()
