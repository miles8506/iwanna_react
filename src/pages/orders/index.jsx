import React, { memo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import dayjs from 'dayjs'

import { headerCells } from './config'
import { requestOrderListAction, orderCurryStatusEnum } from '@/store/order'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'
import { requestDelOrder, requestUpdateOrder } from '@/service/order'
import { filterOrderEnums } from '@/enums'

import { useOrderSearchContext } from '@/context/use-order-search'
import { ThemeProvider } from '@mui/material'
import { OrderWrapper } from './style'
import FunctionBar from './c-cpns/function-bar'
import MSTable from '@/components/ms-table'
import MSButton from '@/components/ms-button'
import ChatIcon from '@mui/icons-material/Chat'
import MSDialog from '@/components/ms-dialog'
import Dialog from '@mui/material/Dialog'
import AddOrder from './c-pages/add-order'
import EditOrder from './c-pages/edit-order'
import PlaceOrder from './c-pages/place-order-list'

export default memo(function Order(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { orderList } = useSelector(
    (state) => ({
      orderList: state.getIn(['orders', 'orderList'])
    }),
    shallowEqual
  )

  const {
    shipOrderStatus,
    callGoodsStatus,
    lastShipOrderDateStatus,
    factoryNumber,
    goodsNumber,
    orderNumber,
    buyerAccount,
    filterType,
    handleFilterType
  } = useOrderSearchContext()

  const [orderListState, setOrderListState] = useState([])
  const [currentShipOrderGoods, setCurrentShipOrderGoods] = useState(null)
  const [isShowShipmentDialog, setIsShowShipmentDialog] = useState(false)
  const [isShowPlaceOrderDialog, setIsShowPlaceOrderDialog] = useState(false)
  const [isShowAddOrderDialog, setIsShowAddOpenOrderDialog] = useState(false)
  const [isShowEditOrderDialog, setIsShowOpenEditOrderDialog] = useState(false)
  const [isShowPlaceOrderListDialog, setIsShowPlaceOrderListDialog] = useState(false)
  const [editOrderId, setEditOrderId] = useState(null)
  const [page, setPage] = useState(0)
  const [remind, setRemind] = useState(null);

  const theme = useCreateMUITheme()
  const handleDeleteRow = async (delOrders, closeDialog) => {
    for (const item of delOrders) {
      await requestDelOrder('orders', item.toString())
    }
    dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
    closeDialog()
  }
  const handleEditOrder = (id) => {
    setEditOrderId(id)
    setRemind(id)
    setIsShowOpenEditOrderDialog(true)
  }

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

  const filterSearch = (type, savePage = false) => {
    handleFilterType(type)
    !savePage && setPage(0)

    switch (type) {
      case filterOrderEnums.status:
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
          .map((item, index) => ({
            ...item,
            index: index + 1
          }))
        setOrderListState([...statusResult])
        break
      case filterOrderEnums.factoryNumber:
        const factoryResult = orderList.filter(orderDetail => {
          if (orderDetail.orderCurryStatus !== orderCurryStatusEnum[0]) return false
          for (const item of orderDetail.orderList) {
            return item.factoryNum === factoryNumber.trim()
          }
          return false
        }).map((item, index) => ({
          ...item,
          index: index + 1
        }))
        setOrderListState([...factoryResult])
        break
      case filterOrderEnums.goodsNumber:
        const goodsNumberResult = orderList.filter(orderDetail => {
          if (orderDetail.orderCurryStatus !== orderCurryStatusEnum[0]) return false
          for (const item of orderDetail.orderList) {
            if (item.goodsNum === goodsNumber.trim()) return true
          }
          return false
        }).map((item, index) => ({
          ...item,
          index: index + 1
        }))
        setOrderListState([...goodsNumberResult])
        break
      case filterOrderEnums.orderNumber:
        const orderNumberResult = orderList.filter(item => item.orderNumber === orderNumber.trim()).map((item, index) => ({
          ...item,
          index: index + 1
        }))
        setOrderListState([...orderNumberResult])
        break
      case filterOrderEnums.buyerAccount:
        const buyerAccountResult = orderList.filter(item => item.buyerAccount === buyerAccount.trim()).map((item, index) => ({
          ...item,
          index: index + 1
        }))
        setOrderListState([...buyerAccountResult])
        break
      default:
        return
    }
  }

  const checkOrderStatus = () => currentShipOrderGoods?.orderList.some(item => item.status === false)

  const handleCloseAddOrderDialog = async () => {
    setIsShowAddOpenOrderDialog(false)
    await dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
  }

  const handleCloseEditOrderDialog = async () => {
    setIsShowOpenEditOrderDialog(false)
    await dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
  }

  useEffect(() => {
    dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
  }, [dispatch])

  useEffect(() => {
    setOrderListState([...orderList])
    filterType && filterSearch(filterType, true)
  }, [orderList])

  return (
    <OrderWrapper>
      <ThemeProvider theme={theme}>
        <div className="header">
          <FunctionBar
            history={history}
            filterSearch={filterSearch}
            setOpenOrderDialog={setIsShowAddOpenOrderDialog}
            handlePlaceOrderDialog={setIsShowPlaceOrderListDialog}
          />
        </div>
        <div className="body">
          <MSTable
            title="Order List"
            rows={orderListState}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
            alertContent="確定要刪除該訂單？"
            page={page}
            setPage={setPage}
            remindStatus={remind}
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
              onClick={() => setIsShowPlaceOrderDialog(false)}
            />
          </div>
        }
      />
      <Dialog
        fullScreen
        open={isShowAddOrderDialog}
        onClose={() => handleCloseAddOrderDialog}
      >
        <AddOrder
          handleOrderDialog={handleCloseAddOrderDialog}
        />
      </Dialog>
      <Dialog
        fullScreen
        open={isShowEditOrderDialog}
        onClose={() => handleCloseEditOrderDialog}
      >
        <EditOrder
          iid={editOrderId}
          handleOrderDialog={handleCloseEditOrderDialog}
        />
      </Dialog>
      <Dialog
        fullScreen
        open={isShowPlaceOrderListDialog}
        onClose={() => setIsShowPlaceOrderListDialog}
      >
        <PlaceOrder
          handlePlaceOrderDialog={setIsShowPlaceOrderListDialog}
        />
      </Dialog>
    </OrderWrapper>
  )
})
