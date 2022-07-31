import { combineReducers } from 'redux-immutable'
import { reducer as sortsReducer } from './sorts/reducer'
import { reducer as colorsReducer } from './colors'
import { reducer as goodsReducer } from './goods'
import { reducer as ordersReducer } from './order'

const reducer = combineReducers({
  sorts: sortsReducer,
  colors: colorsReducer,
  goods: goodsReducer,
  orders: ordersReducer
})

export default reducer
