import React, { memo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import dayjs from 'dayjs'

import { headerCells } from './config'
import { requestOrderListAction } from '@/store/order'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'
import { requestDelOrder, requestUpdateOrder } from '@/service/order'
import { filterOrderEnums } from '@/enums'
import analysisQueryUrl from '@/utils/analysis'
import objectToArray from '@/utils/objectToArray'

import { ThemeProvider } from '@mui/material'
import { OrderWrapper } from './style'
import FunctionBar from './c-cpns/function-bar'
import MSTable from '@/components/ms-table'
import MSButton from '@/components/ms-button'
import ChatIcon from '@mui/icons-material/Chat'
import MSDialog from '@/components/ms-dialog'

export default memo(function Order(props) {
  const { history, location } = props

  const dispatch = useDispatch()
  const { orderList } = useSelector(
    (state) => ({
      orderList: state.getIn(['orders', 'orderList'])
    }),
    shallowEqual
  )

  const [orderListState, setOrderListState] = useState([])
  const [currentShipOrderGoods, setCurrentShipOrderGoods] = useState(null)
  const [isShowShipmentDialog, setIsShowShipmentDialog] = useState(false)
  const [isShowPlaceOrderDialog, setIsShowPlaceOrderDialog] = useState(false);
  // const [filterType, setFilterType] = useState(null);

  const theme = useCreateMUITheme()
  const handleDeleteRow = async (delOrders, closeDialog) => {
    for (const item of delOrders) {
      await requestDelOrder('orders', item.toString())
    }
    dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
    closeDialog()
  }
  const handleEditOrder = (id) => {
    history.push(`/orders/edit/${id}`)
  }

  // const getQueryUrl = () => {
  //   `?type=status&shipOrderStatus=${}&callGoodsStatus=-1&lastShipOrderDateStatus=-1`
  // }

  const handleShowDialog = (orderDetail) => {
    if (!orderDetail.placeOrderStatus) {
      setIsShowPlaceOrderDialog(true)
      return
    }
    setCurrentShipOrderGoods(orderDetail)
    setIsShowShipmentDialog(true)
  }

  const changeOrderShipmentStatus = async (id, orderDetail) => {
    await requestUpdateOrder('orders', id.toString(), {
      ...orderDetail,
      orderCurryStatus: 2
    })
    dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
    setIsShowShipmentDialog(false)
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
        const statusResult = orderList
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
            } else {
              return item.placeOrderStatus === callGoodsStatus
            }
          })
          .sort((a, b) => {
            if (lastShipOrderDateStatus === -1) {
              return a
            }
            if (lastShipOrderDateStatus === 0) {
              return dayjs(a.lastShipmentDate).valueOf() - dayjs(b.lastShipmentDate).valueOf()
            }
            if (lastShipOrderDateStatus === 1) {
              return dayjs(b.lastShipmentDate).valueOf() - dayjs(a.lastShipmentDate).valueOf()
            }
          })
        // setFilterType(filterOrderEnums.status)
        setOrderListState([...statusResult])
        break
      case filterOrderEnums.factoryNumber:
        const [factoryNumber] = filterValues
        const factoryResult = orderList.filter(orderDetail => {
          for (const item of orderDetail.orderList) {
            if (item.factoryNum === factoryNumber.trim()) return true
          }
          return false
        })
        // setFilterType(filterOrderEnums.factoryNumber)
        setOrderListState([...factoryResult])
        break
      case filterOrderEnums.goodsNumber:
        const [goodsNumber] = filterValues
        const goodsNumberResult = orderList.filter(orderDetail => {
          for (const item of orderDetail.orderList) {
            if (item.goodsNum === goodsNumber.trim()) return true
          }
          return false
        })
        // setFilterType(filterOrderEnums.goodsNumber)
        setOrderListState([...goodsNumberResult])
        break
      case filterOrderEnums.orderNumber:
        const [orderNumber] = filterValues
        const orderNumberResult = orderList.filter(item => item.orderNumber === orderNumber.trim())
        // setFilterType(filterOrderEnums.orderNumber)
        setOrderListState([...orderNumberResult])
        break
      case filterOrderEnums.buyerAccount:
        const [buyerAccount] = filterValues
        const buyerAccountResult = orderList.filter(item => item.buyerAccount === buyerAccount.trim())
        // setFilterType(filterOrderEnums.buyerAccount)
        setOrderListState([...buyerAccountResult])
        break
      default:
        return
    }
  }

  const checkOrderStatus = () => currentShipOrderGoods?.orderList.some(item => item.status === false)

  // const init = async () => {
  //   await dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
  //   if (!location.search) return
  //   const { type, ...filterValue } = analysisQueryUrl(location.search)
  //   filterSearch(type, objectToArray(filterValue))
  // }

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
            // searchQueryUrl={searchQueryUrl}
          />
        </div>
        <div className="body">
          <MSTable
            title="Order List"
            rows={orderListState}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
            alertContent="確定要刪除該訂單？"
          />
        </div>
      </ThemeProvider>
      <MSDialog
        isShowDialog={isShowShipmentDialog}
        content={
          <div>
            {checkOrderStatus() && '訂單商品尚未到期，'}
            確定要將{' '}
            <span style={{ fontSize: '20px', color: '#ee5050' }}>
              {currentShipOrderGoods?.shopeeOrderNumber}
            </span>{' '}
            狀態更改為已出貨嗎?
          </div>
        }
        footer={
          <div>
            <MSButton
              value="取消"
              variant="outlined"
              color="error"
              style={{ marginRight: '10px' }}
              onClick={() => setIsShowShipmentDialog(false)}
            />
            <MSButton
              value="確定"
              variant="outlined"
              color="success"
              onClick={() =>
                changeOrderShipmentStatus(
                  currentShipOrderGoods.id,
                  currentShipOrderGoods
                )
              }
            />
          </div>
        }
      ></MSDialog>
      <MSDialog
        isShowDialog={isShowPlaceOrderDialog}
        content={<div>請確認叫貨狀態是否為已叫貨</div>}
        footer={
          <div>
            <MSButton
              value="確定"
              variant="outlined"
              color="success"
              onClick={() =>setIsShowPlaceOrderDialog(false)}
            />
          </div>
        }
      />
    </OrderWrapper>
  )
})

// setSearchQueryUrl(`?type=${filterOrderEnums.status}shipOrderStatus=${shipOrderStatus}&callGoodsStatus=${callGoodsStatus}&lastShipOrderDateStatus=${lastShipOrderDateStatus}`)
