import { GET_GOOD_LIST, GET_ORIGIN_GOODS_LIST } from './index'
import { requestGoods } from '@/service/goods'

// action
export const getGoodListAction = res => ({ type: GET_GOOD_LIST, res })
export const getOriginGoodsListAction = res => ({ type: GET_ORIGIN_GOODS_LIST, res })

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
          item.data().price.basePriceRMB,
          item.data().price.officialPrice,
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
      container.sort((a, b) => a.goodsNum - b.goodsNum)
      dispatch(getGoodListAction(container))
    } catch (err) {
      window.alert(new Error(err))
    }
  }
}

export function requestOriginGoodsListAction() {
  const container = []
  return async dispatch => {
    try {
      const res = await requestGoods('goods')
      for (const item of res.docs) {
        container.push(item.data())
      }
      dispatch(getOriginGoodsListAction(container))
    } catch (err) {
      window.alert(new Error(err))
    }
  }
}
