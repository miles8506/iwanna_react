import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { headerCells } from './config'
import { requestOrderListAction } from '@/store/order'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'
import { requestDelOrder } from '@/service/order/index'

import { ThemeProvider } from '@mui/material'
import { OrderWrapper } from './style'
import FunctionBar from './c-cpns/function-bar'
import MSTable from '@/components/ms-table'
import MSButton from '@/components/ms-button'
import ChatIcon from '@mui/icons-material/Chat';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import IconButton from '@mui/material/IconButton';

export default memo(function Order(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { orderList } = useSelector(state => ({
    orderList: state.getIn(['orders', 'orderList'])
  }), shallowEqual)

  const [orderListState, setOrderListState] = useState([]);

  const theme = useCreateMUITheme()
  const handleDeleteRow = async (delOrders, closeDialog) => {
    for (const item of delOrders) {
      await requestDelOrder('orders', item.toString())
    }
    dispatch(requestOrderListAction(controlButtonsJsx))
    closeDialog()
  }
  const handleEditOrder = (id) => {
    console.log('edit', id)
  }

  const handleDetailOrder = (id) => {
    console.log(id);
  }

  const controlButtonsJsx = (id) => {
    return (
      <>
        <MSButton
          color="info"
          value="編輯"
          style={{ marginRight: '20px' }}
          onClick={e => handleEditOrder(id)}
        />
        <MSButton
          value="詳情"
          onClick={e => handleDetailOrder(id)}
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
    </OrderWrapper>
  )
})
