import { requestGetCanningMessage } from '@/service/canning-message'
import { GET_CANNING_MESSAGE } from './index'

export const getCanningMessage = (res) => ({ type: GET_CANNING_MESSAGE, res })

export function requestCanningMessage() {
  const container = []
  function createTableData(message, id) {
    return { message, id }
  }

  return async (dispatch) => {
    const res = await requestGetCanningMessage('cans')
    res.docs.forEach(item => {
      const data = createTableData(item.data().message, item.data().id)
      container.push(data)
    })
    dispatch(getCanningMessage(container))
  }
}
