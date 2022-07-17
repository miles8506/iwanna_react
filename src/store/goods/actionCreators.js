import { GET_GOOD_LIST } from './index'
import { requestGoods } from '@/service/goods'

// action
export const getGoodListAction = (res) => ({ type: GET_GOOD_LIST, res })

// thunk
export function requestGoodListAction(controlButton) {
  const container = []
  return async dispatch => {
    try {
      const res = await requestGoods('goods')
      res.docs.forEach(item => {
        const obj = item.data()
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            obj[key] = obj[key].join(',')
          }
        }
        container.push({ ...obj, control: controlButton(obj.id) })
      })
      dispatch(getGoodListAction(container))
    } catch (err) {
      window.alert(new Error(err))
    }
  }
}
