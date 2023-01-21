import dayjs from 'dayjs'

export function getCurrentTimeStamp() {
  return dayjs().valueOf()
}

export function transferTimeStamp(val) {
  return dayjs(val).valueOf()
}

export function formateStampTime(time, format = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs(time).format(format)
}
