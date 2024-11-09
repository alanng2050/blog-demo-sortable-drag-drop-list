import dayjs from 'dayjs'

export const DATE_FORMAT = 'MM/DD/YYYY'
export const formatDate = (val: dayjs.ConfigType, format = '') =>
  dayjs(val).format(format || DATE_FORMAT)

export const getStartAndEndDate = (val: dayjs.ConfigType) => {
  const date = dayjs(val)
  return {
    start: date.startOf('month').format(DATE_FORMAT),
    end: date.endOf('month').format(DATE_FORMAT),
  }
}

export const getMonthName = (
  month: number,
  option: Intl.DateTimeFormatOptions['month'] = 'short'
) => {
  const formatter = new Intl.DateTimeFormat('en', { month: option })
  const name = formatter.format(new Date().setMonth(month))
  return name
}
