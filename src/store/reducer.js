import { combineReducers } from 'redux-immutable'
import { reducer as sortsReducer } from './sorts/reducer'
import { reducer as colorsReducer } from './colors'
import { reducer as goodsReducer } from './goods'

const reducer = combineReducers({
  sorts: sortsReducer,
  colors: colorsReducer,
  goods: goodsReducer
})

export default reducer
