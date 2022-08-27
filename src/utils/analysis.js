export default function analysisQueryUrl(queryUrl) {
  const targetObj = {}
  const queryUrlList = queryUrl.slice(1).split('&')
  for (const item of queryUrlList) {
    const queryUrl = item.split('=')
    targetObj[queryUrl[0]] = queryUrl[1]
  }
  return targetObj
}
