import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import dayjs from 'dayjs'

import { requestSortsAction } from '@/store/sorts/actionCreators'
import { ALERT_DURATION } from '@/common/constants'
import { requestAddOrder } from '@/service/order/index'

import { AddOrderWrapper } from './style'
import BasePageLayout from '@/layout/base-page'
import AddOrderBody from './c-cpns/body'
import OrderDialog from './c-cpns/order-dialog'
import MSCustomAlert from '@/components/ms-custom-alert'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MSButton from '@/components/ms-button'

const AddOrder = memo((props) => {
  const { handleOrderDialog } = props

  const dispatch = useDispatch()
  const { sortList } = useSelector(state => ({
    sortList: state.getIn(['sorts', 'sortList'])
  }), shallowEqual)

  const [baseOrdersDetailInput, setBaseOrderDetailInput] = useState({
    orderNumber: {
      iid: 0,
      name: '訂單編號',
      status: true,
      value: '',
      message: ''
    },
    buyerAccount: {
      iid: 2,
      name: '買家帳號',
      status: true,
      value: '',
      message: ''
    },
  })

  const [lastDateTime, setLastDateTime] = useState({
    name: '最晚出貨日期',
    status: true,
    value: '',
    message: ''
  })

  const [goodsFactoryNum, setGoodsFactoryNum] = useState({
    goodsFactoryNum: {
      iid: 0,
      name: '商品貨號查詢',
      status: true,
      value: '',
      message: ''
    },
  });

  const [goodsCount, setGoodsCount] = useState({
    goodsCount: {
      iid: 0,
      name: '數量',
      status: true,
      value: '',
      message: ''
    },
  });

  const [goodsName, setGoodsName] = useState('')
  const [sortSelect, setSortSelect] = useState('')
  const [colorsSelect, setColorsSelect] = useState('')
  const [sizesSelect, setSizesSelect] = useState('')
  const [remark, setRemark] = useState('');
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState({
    status: 'warning',
    message: ''
  })
  const [orderList, setOrderList] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [orderCount, setOrderCount] = useState(0)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setAlertStatus({ status: 'warning', message: '' })
    setIsShowAlert(false)
  }

  const handleDialog = () => {
    setOpenDialog(true)
  }

  const addOrderToOrderCart = (order) => {
    setOrderList([...orderList, order])
    setOrderCount(orderCount + 1)
  }

  const resetForm = () => {
    setGoodsName('')
    setSortSelect('')
    setColorsSelect('')
    setSizesSelect('')
    setRemark('')
    setIsShowAlert(true)
    setGoodsFactoryNum({
      goodsFactoryNum: {
        ...goodsFactoryNum.goodsFactoryNum,
        status: true,
        value: '',
        message: ''
      }
    })
    setGoodsCount({
      goodsCount: {
        ...goodsCount.goodsCount,
        status: true,
        value: '',
        message: ''
      }
    })
  }

  const pushOrderToOrderList = (order) => {
    addOrderToOrderCart(order)
    resetForm()
    setAlertStatus({
      status: 'success',
      message: '已將該商品加入訂單列表中'
    })
  }

  // in cart order
  const delOrder = (delOrders, closeDialog) => {
    const copyOrderList = [...orderList]
    delOrders.forEach(item => {
      const targetIndex = copyOrderList.findIndex(orderItem => orderItem.id === item)
      copyOrderList.splice(targetIndex, 1)
    })
    setOrderList([...copyOrderList])
    setOrderCount(copyOrderList.length)
    closeDialog()
  }

  const submitOrder = async () => {
    if (orderList.length === 0) return
    const { orderNumber, buyerAccount } = baseOrdersDetailInput
    const orderTotal = orderList.reduce((previousVal, currentVal) => {
      return previousVal += Number(currentVal.goodsTotal)
    }, 0)
    const order = {
      id: dayjs().valueOf(),
      buyerAccount: buyerAccount.value,
      lastShipmentDate: dayjs(lastDateTime.value).valueOf(),
      orderCurryStatus: 0,
      orderList,
      orderNumber: orderNumber.value,
      orderTotal,
      placeOrderStatus: false,
      remark: remark.trim()
    }
    try {
      await requestAddOrder('orders', order.id + '', order)
      // history.push('/orders')
      handleOrderDialog(false)
    } catch (err) {
      window.alert(err)
    }
  }

  useEffect(() => {
    dispatch(requestSortsAction())
  }, [dispatch])

  return (
    <AddOrderWrapper>
      <BasePageLayout>
        <div slot='header' style={{ fontSize: '24px', color: 'rgba(0,0,0,0.6)' }}>
          <IconButton
            onClick={() => handleOrderDialog(false)}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <span style={{verticalAlign: 'middle'}}>新建訂單</span>
        </div>
        <div slot='body'>
          <div className="add-order-icon">
            <IconButton onClick={handleDialog}>
              <span className='order-count'>{ orderCount }</span>
              <ViewListOutlinedIcon sx={{ fontSize: 35 }} color="action"/>
            </IconButton>
          </div>
          <AddOrderBody
            baseOrdersDetailInput={baseOrdersDetailInput}
            setBaseOrderDetailInput={setBaseOrderDetailInput}
            lastDateTime={lastDateTime}
            setLastDateTime={setLastDateTime}
            sortSelect={sortSelect}
            setSortSelect={setSortSelect}
            sortOptions={sortList}
            goodsName={goodsName}
            setGoodsName={setGoodsName}
            colorsSelect={colorsSelect}
            setColorsSelect={setColorsSelect}
            sizesSelect={sizesSelect}
            setSizesSelect={setSizesSelect}
            setIsShowAlert={setIsShowAlert}
            setAlertStatus={setAlertStatus}
            pushOrderToOrderList={pushOrderToOrderList}
            goodsFactoryNum={goodsFactoryNum}
            setGoodsFactoryNum={setGoodsFactoryNum}
            goodsCount={goodsCount}
            setGoodsCount={setGoodsCount}
            remark={remark}
            setRemark={setRemark}
          />
        </div>
        <div slot='footer'>
          <MSButton
            style={{ marginRight: '10px' }}
            value="cancel"
            variant="outlined"
            color="error"
            onClick={() => handleOrderDialog(false)}
          />
          <MSButton
            value="confirm"
            variant="outlined"
            color="success"
            onClick={submitOrder}
          />
        </div>
      </BasePageLayout>
      <MSCustomAlert
        open={isShowAlert}
        autoHideDuration={ALERT_DURATION}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        severity={alertStatus.status}
        sx={{ width: '100%' }}
      >
        { alertStatus.message }
      </MSCustomAlert>
      <OrderDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        orderList={orderList}
        delOrder={delOrder}
      />
    </AddOrderWrapper>
  )
})

export default AddOrder
