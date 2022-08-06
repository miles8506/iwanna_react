import { Map } from "immutable"
import { GET_GOOD_LIST, GET_ORIGIN_GOODS_LIST } from './index'

const initialState = Map({
  goodsList: [],
  originGoodsList: []
})

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GOOD_LIST:
      return state.set('goodsList', action.res)
    case GET_ORIGIN_GOODS_LIST:
      return state.set('originGoodsList', action.res)
    default:
      return state
  }
}
