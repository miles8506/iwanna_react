import { Map } from "immutable"
import { GET_CANNING_MESSAGE } from './index'

const canningMessageInitial = Map({
  canningMessageList: []
})

export function reducer(state = canningMessageInitial, action) {
  switch (action.type) {
    case GET_CANNING_MESSAGE:
      return state.set('canningMessageList', action.res)
    default:
      return state
  }
}
