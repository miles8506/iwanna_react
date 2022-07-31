import { Map } from "immutable";
import { GET_ORDER_LIST } from './constants'

const initialOrder = Map({
  orderList: []
})

export function reducer(state = initialOrder, action) {
  switch (action.type) {
    case GET_ORDER_LIST:
      return state.set('orderList', action.res)
    default:
      return state
  }
}
