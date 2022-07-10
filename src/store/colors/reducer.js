import { Map } from "immutable"
import { GET_COLORS } from './index'

const colorsInitial = Map({
  colorList: []
})

export function reducer(state = colorsInitial, action) {
  switch (action.type) {
    case GET_COLORS:
      return state.set('colorList', action.res)
    default:
      return state
  }
}
