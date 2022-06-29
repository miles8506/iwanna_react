import dayjs from 'dayjs'

export function getCurrentTimeStamp() {
  return dayjs().valueOf()
}