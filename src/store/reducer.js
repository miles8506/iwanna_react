import { combineReducers } from 'redux-immutable'
import { reducer as sortsReducer } from './sorts/reducer'

const reducer = combineReducers({
  sorts: sortsReducer
})

export default reducer
