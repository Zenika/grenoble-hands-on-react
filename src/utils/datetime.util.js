import { format, parse } from 'date-fns'

export const displayDate = (date) => {
  return format(parse(date, 'yyyyMMdd', new Date()), 'dd/MM/yyyy')
}
