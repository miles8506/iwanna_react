import { requestGetOrders } from '@/service/order'
import { GET_ORDER_LIST } from './constants'

// action
export const getOrderTotalAction = res => ({ type: GET_ORDER_LIST, res })

// thunk
export function requestOrderListAction(controlButtonsJsx) {
  const container = []
  function createTableData(index, buyerAccount, shopeeOrderNumber, orderTotal, placeOrderStatus, orderCurryStatus, lastShipmentDate, control, id,) {
    return {
      index,
      buyerAccount,
      shopeeOrderNumber,
      orderTotal,
      placeOrderStatus,
      orderCurryStatus,
      lastShipmentDate,
      control,
      id
    }
  }
  return async dispatch => {
    try {
      const res = await requestGetOrders('orders')
      res.docs.forEach((item, index) => {
        let orderTotal = 0
        for (let i = 0; i < item.data().orderList.length; i++) {
          orderTotal += +(item.data().orderList[i].price)
        }
        const obj = createTableData(
          index + 1,
          item.data().buyerAccount,
          item.data().shopeeOrderNumber,
          orderTotal,
          item.data().placeOrderStatus ? '已叫貨' : '未叫貨',
          item.data().orderCurryStatus,
          item.data().lastShipmentDate,
          controlButtonsJsx(item.data().id),
          item.data().id
        )
        container.push(obj)
      })
      dispatch(getOrderTotalAction(container))
    } catch (err) {
      window.alert('err:', err)
    }
  }
}
