import { RATE } from "@/common/constants"

export function computedBasePrice(price) {
  if (isNaN(Number(+price))) return
  return Math.ceil((Number(+price) + 5) * RATE)
}

export function computedOfficialPrice(price) {
  return computedBasePrice(price) * 2
}


export function computedSuggestPrice(price) {
  if (isNaN(Number(+price))) return
  return Math.ceil((Number(+price) + 5) * RATE * 2.3)
}
