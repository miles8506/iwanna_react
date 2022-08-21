import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { headerCells } from './config'
import { requestOrderListAction } from '@/store/order'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'
import { requestDelOrder, requestUpdateOrder } from '@/service/order'

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
  const { orderList } = useSelector(state => ({
    orderList: state.getIn(['orders', 'orderList'])
  }), shallowEqual)

  const [orderListState, setOrderListState] = useState([])
  const [isShowDialog, setIsShowDialog] = useState(false);

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

  const changeOrderShipmentStatus = async (id, orderDetail) => {
    await requestUpdateOrder('orders', id.toString(), { ...orderDetail, orderCurryStatus: 2 })
    dispatch(requestOrderListAction(controlButtonsJsx, remarkIcon))
  }

  const controlButtonsJsx = (id, orderDetail) => {
    return (
      <>
        <MSButton
          color="success"
          value="已出貨"
          style={{ marginRight: '20px' }}
          onClick={e => setIsShowDialog(true)}
          disabled={orderDetail.orderCurryStatus === 2}
        />
        <MSButton
          color="info"
          value="編輯"
          onClick={e => handleEditOrder(id)}
        />
      </>
    )
  }

  const remarkIcon = () => {
    return (
      <ChatIcon sx={{ fontSize: 25, color: '#d61515' }} color="disabled"/>
    )
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
          <FunctionBar history={history}></FunctionBar>
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
      {/* <MSDialog
        isShowDialog={isShowDialog}
        content={<div>確定是否更改叫貨狀態?</div>}
        footer={
          <div>
            <MSButton
              value="取消"
              variant="outlined"
              color="error"
              style={{ marginRight: '10px' }}
              onClick={e => setIsShowDialog(false)}
            />
            <MSButton
              value="確定"
              variant="outlined"
              color="success"
              onClick={e => confirmPlaceOrder(setIsShowDialog)}
            />
          </div>
        }
      ></MSDialog> */}
    </OrderWrapper>
  )
})
