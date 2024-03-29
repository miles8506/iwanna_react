import { requestGetOrders } from '@/service/order'
import { GET_ORDER_LIST } from './constants'
import dayjs from 'dayjs'
import { getCurrentTimeStamp, transferTimeStamp } from '@/utils/time'

// enum
export const orderCurryStatusEnum = {
  0: '未出貨',
  1: '可出貨',
  2: '已出貨'
}

// action
export const getOrderTotalAction = res => ({ type: GET_ORDER_LIST, res })

// thunk
export function requestOrderListAction(controlButtonsJsx, ChatIcon) {
  const container = []
  function createTableData(index, buyerAccount, orderNumber, orderTotal, placeOrderStatus, orderCurryStatus, lastShipmentDate, control, icon, id, orderList, pastDueAlert) {
    return {
      index,
      buyerAccount,
      orderNumber,
      orderTotal,
      placeOrderStatus,
      orderCurryStatus,
      lastShipmentDate,
      control,
      icon,
      id,
      orderList,
      pastDueAlert
    }
  }
  return async dispatch => {
    try {
      const res = await requestGetOrders('orders')
      const currentTimeStamp = getCurrentTimeStamp()

      res.docs.forEach((item, index) => {
        const isShowRemarkIcon = item.data().orderList.some(item => item.remark.length > 0)
        const pastDueAlert = (item.data().orderCurryStatus === 0 || item.data().orderCurryStatus === 1) && transferTimeStamp(item.data().lastShipmentDate) - currentTimeStamp <= 864000000 ? 'red' : '#545454'

        const obj = createTableData(
          index + 1,
          item.data().buyerAccount,
          item.data().orderNumber,
          item.data().orderTotal,
          item.data().placeOrderStatus ? '已叫貨' : '未叫貨',
          orderCurryStatusEnum[item.data().orderCurryStatus],
          dayjs(item.data().lastShipmentDate).format('YYYY/MM/DD'),
          controlButtonsJsx(item.data().id, item.data()),
          isShowRemarkIcon ? ChatIcon() : null,
          item.data().id,
          item.data().orderList,
          pastDueAlert
        )
        container.push(obj)
      })
      dispatch(getOrderTotalAction(container))
    } catch (err) {
      window.alert('err:', err)
    }
  }
}
