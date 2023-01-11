export function checkEmptyString(val) {
  return val.toString().trim().length > 0 ? false : true
}

export function verifyBuyerText(text) {
  const rgx = /[^a-zA-Z0-9_.]/g
  if (rgx.test(text)) {
    let copyText = text
    for (const item of text) {
      if (rgx.test(item)) {
        copyText = copyText.replace(item, '')
      }
    }
    return copyText
  }
  return text
}
