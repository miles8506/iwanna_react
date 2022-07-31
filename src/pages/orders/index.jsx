import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { headerCells } from './config'
import { requestOrderListAction } from '@/store/order'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'

import { ThemeProvider } from '@mui/material'
import { OrderWrapper } from './style'
import FunctionBar from './c-cpns/function-bar'
import MSTable from '@/components/ms-table'
import MSButton from '@/components/ms-button'

export default memo(function Order(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { orderList } = useSelector(state => ({
    orderList: state.getIn(['orders', 'orderList'])
  }), shallowEqual)

  const [orderListState, setOrderListState] = useState([]);

  const theme = useCreateMUITheme()
  const handleDeleteRow = (delOrders, closeDialog) => {
    console.log(delOrders);
  }
  const handleEditOrder = (id) => {
    console.log('edit', id);
  }
  const handleDetailOrder = (id) => {
    console.log('detail', id);
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

  useEffect(() => {
    dispatch(requestOrderListAction(controlButtonsJsx))
  }, [dispatch])

  useEffect(() => {
    setOrderListState([...orderList])
  }, [orderList])

  return (
    <OrderWrapper>
        <FunctionBar history={history}></FunctionBar>
      <ThemeProvider theme={theme}>

      <div className="order-content">
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
