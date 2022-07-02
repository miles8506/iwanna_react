import { Map } from 'immutable'
import { GET_SORTS } from './constants'

const initialState = Map({
  sortList: []
})

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SORTS:
      return state.set('sortList', action.res)
    default:
      return state
  }
}
