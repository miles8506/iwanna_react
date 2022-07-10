import { combineReducers } from 'redux-immutable'
import { reducer as sortsReducer } from './sorts/reducer'
import { reducer as colorsReducer } from './colors'

const reducer = combineReducers({
  sorts: sortsReducer,
  colors: colorsReducer
})

export default reducer
