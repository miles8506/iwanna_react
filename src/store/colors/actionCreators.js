import { requestGetColors } from '@/service/colors'
import { GET_COLORS } from './index'

// action
export const getColorsAction = res => ({ type: GET_COLORS, res })

// thunk
export function requestColorsAction() {
  const container = []
  function createTableData(color, id) {
    return { color, id }
  }
  return async (dispatch) => {
    const res = await requestGetColors('colors')
    res.docs.forEach(item => {
      const data = createTableData(item.data().color, item.data().color)
      container.push(data)
    })
    dispatch(getColorsAction(container))
  }
}
