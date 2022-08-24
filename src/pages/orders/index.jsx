import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { headerCells } from './config'
import { requestOrderListAction } from '@/store/order'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'
import { requestDelOrder, requestUpdateOrder } from '@/service/order'
import { filterOrderEnums } from '@/enums'

import { ThemeProvider } from '@mui/material'
import { OrderWrapper } from './style'
import FunctionBar from './c-cpns/function-bar'
import MSTable from '@/components/ms-table'
import MSButton from '@/components/ms-button'
import ChatIcon from '@mui/icons-material/Chat'
import MSDialog from '@/components/ms-dialog'

export default memo(function Order(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { orderList } = useSelector(
    (state) => ({
      orderList: state.getIn(['orders', 'orderList'])
    }),
    shallowEqual
  )

  const [orderListState, setOrderListState] = useState([])
  const [currentShipOrderGoods, setCurrentShipOrderGoods] = useState(null)
  const [isShowDialog, setIsShowDialog] = useState(false)

  const theme = useCreateMUITheme()
  const handleDeleteRow = async (delOrders, closeDialog) => {
    for (const item of delOrders) {
      await requestDelOrder('orders', item.toString())
    }
    dispatch(requestOrderListAction(controlButtonsJsx))
    closeDialog()
  }
  const handleEditOrder = (id) => {
    history.push(`/orders/edit/${id}`)
  }

  const handleShowDialog = (orderDetail) => {
    setCurrentShipOrderGoods(orderDetail)
    setIsShowDialog(true)
  }

  const changeOrderShipmentStatus = async (id, orderDetail) => {
    await requestUpdateOrder('orders', id.toString(), {
      ...orderDetail,
      orderCurryStatus: 2
    })
    dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
    setIsShowDialog(false)
  }

  const controlButtonsJsx = (id, orderDetail) => {
    return (
      <>
        <MSButton
          color="success"
          value="已出貨"
          style={{ marginRight: '20px' }}
          onClick={() => handleShowDialog(orderDetail)}
          disabled={orderDetail.orderCurryStatus === 2}
        />
        <MSButton
          color="info"
          value="編輯"
          onClick={() => handleEditOrder(id)}
        />
      </>
    )
  }

  const remarkIcon = () => {
    return <ChatIcon sx={{ fontSize: 25, color: '#d61515' }} color="disabled" />
  }

  const filterSearch = (type, filterValues) => {
    switch (type) {
      case filterOrderEnums.status:
        const [shipOrderStatus, callGoodsStatus, lastShipOrderDateStatus] =
          filterValues
        const result = orderList
          .filter((item) => {
            if (shipOrderStatus === -1) {
              return true
            } else {
              return item.orderCurryStatus === shipOrderStatus
            }
          })
          .filter((item) => {
            if (callGoodsStatus === -1) {
              return true
            } else if (callGoodsStatus === '未叫貨') {
              return item.placeOrderStatus === '未叫貨'
            } else if (callGoodsStatus === '已叫貨') {
              return item.placeOrderStatus === '已叫貨'
            }
          })
          .sort((a, b) => {
            if (lastShipOrderDateStatus === 0) {
              return a.id - b.id
            } else if (lastShipOrderDateStatus === 1) {
              return b.id - a.id
            }
          })
        setOrderListState([...result])
        break
      case filterOrderEnums.factoryNumber:
        console.log('factoryNumber')
        break
      case filterOrderEnums.goodsNumber:
        console.log('goodsNumber')
        break
      case filterOrderEnums.shopeeOrder:
        console.log('shopeeOrder')
        break
      case filterOrderEnums.buyerAccount:
        console.log('buyerAccount')
        break
      default:
        return
    }
  }

  useEffect(() => {
    dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
  }, [dispatch])

  useEffect(() => {
    setOrderListState([...orderList])
  }, [orderList])

  return (
    <OrderWrapper>
      <ThemeProvider theme={theme}>
        <div className="header">
          <FunctionBar
            history={history}
            filterSearch={filterSearch}
          ></FunctionBar>
        </div>
        <div className="body">
          <MSTable
            title="Order List"
            rows={orderListState}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
          />
        </div>
      </ThemeProvider>
      <MSDialog
        isShowDialog={isShowDialog}
        content={
          <div>
            確定是否更改{' '}
            <span style={{ fontSize: '20px', color: '#ee5050' }}>
              {currentShipOrderGoods?.shopeeOrderNumber}
            </span>{' '}
            訂單叫貨狀態?
          </div>
        }
        footer={
          <div>
            <MSButton
              value="取消"
              variant="outlined"
              color="error"
              style={{ marginRight: '10px' }}
              onClick={(e) => setIsShowDialog(false)}
            />
            <MSButton
              value="確定"
              variant="outlined"
              color="success"
              onClick={(e) =>
                changeOrderShipmentStatus(
                  currentShipOrderGoods.id,
                  currentShipOrderGoods
                )
              }
            />
          </div>
        }
      ></MSDialog>
    </OrderWrapper>
  )
})
