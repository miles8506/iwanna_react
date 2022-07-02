import { requestGetSorts } from '@/service/sorts'
import { GET_SORTS } from './constants'

// actions
const getSortsAction = (res) => ({ type: GET_SORTS, res })

// thunks
export function requestSortsAction() {
  const container = []
  function createTableData(sort, id) {
    return { sort, id }
  }
  return async (dispatch) => {
    const res = await requestGetSorts('sorts')
    res.docs.forEach((item) => {
      const data = createTableData(item.data().sort, item.data().sort)
      container.push(data)
    })
    dispatch(getSortsAction(container))
  }
}
