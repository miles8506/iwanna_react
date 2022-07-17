import { Map } from "immutable"
import { GET_GOOD_LIST } from './index'

const initialState = Map({
  goodsList: []
})

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GOOD_LIST:
      return state.set('goodsList', action.res)
    default:
      return state
  }
}
