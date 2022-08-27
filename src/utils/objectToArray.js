export default function objectToArray(obj) {
  const targetArray = []
  for (const k in obj) {
    if (!isNaN(+(obj[k]))) {
      targetArray.push(+(obj[k]))
    } else {
      targetArray.push(obj[k])
    }
  }

  return targetArray
}
