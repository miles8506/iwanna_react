export function checkEmptyString(val) {
  return val.toString().trim().length > 0 ? false : true
}

export function verifyBuyerText(text) {
  const rgx = /[^a-zA-Z0-9_.]/g
  let copyText = text.replace(/[\u4E00-\u9FA5]+/g, '').trim()
  if (rgx.test(copyText)) {
    for (const item of copyText) {
      if (rgx.test(item)) {
        copyText = copyText.replace(item, '')
      }
    }
    return copyText
  }
  return copyText
}
