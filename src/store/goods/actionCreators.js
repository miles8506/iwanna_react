import { GET_GOOD_LIST } from './index'
import { requestGoods } from '@/service/goods'

// action
export const getGoodListAction = (res) => ({ type: GET_GOOD_LIST, res })

// thunk
export function requestGoodListAction(controlButton) {
  const container = []
  function createTableData(factoryNum, goodsNum, goodsName, basePrice, officialPrice, sort, colors, sizes, id) {
    return {
      factoryNum,
      goodsNum,
      goodsName,
      basePrice,
      officialPrice,
      sort,
      colors,
      sizes,
      id
    }
  }
  return async dispatch => {
    try {
      const res = await requestGoods('goods')
      res.docs.forEach(item => {
        const obj = createTableData(
          item.data().factoryNum,
          item.data().goodsNum,
          item.data().goodsName,
          item.data().basePrice,
          item.data().officialPrice,
          item.data().sort,
          item.data().colors,
          item.data().sizes,
          item.data().factoryNum
        )
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
