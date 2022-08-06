import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { requestSortsAction } from '@/store/sorts/actionCreators'
import { ALERT_DURATION } from '@/common/constants'

import { AddOrderWrapper } from './style'
import BasePageLayout from '@/layout/base-page'
import AddOrderBody from './c-cpns/body'
import OrderDialog from './c-cpns/order-dialog'
import MSCustomAlert from '@/components/ms-custom-alert'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import IconButton from '@mui/material/IconButton';

const AddOrder = memo(() => {
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
    shopeeOrderNumber: {
      iid:1,
      name: '蝦皮訂單編號',
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

  const [goodsName, setGoodsName] = useState('')
  const [sortSelect, setSortSelect] = useState('')
  const [colorsSelect, setColorsSelect] = useState([])
  const [sizesSelect, setSizesSelect] = useState([])
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState({
    status: 'warning',
    message: ''
  })

  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setAlertStatus({ status: 'warning', message: '' })
    setIsShowAlert(false)
  }

  const handleDialog = () => {
    setOpenDialog(true)
  }

  useEffect(() => {
    dispatch(requestSortsAction())
  }, [dispatch])

  return (
    <AddOrderWrapper>
      <BasePageLayout>
        <div slot='header' style={{fontSize: '24px', color: 'rgba(0,0,0,0.6)'}}>
          新建訂單
        </div>
        <div slot='body'>
          <div className="add-order-icon">
            <IconButton onClick={handleDialog}>
              <span className='order-count'>0</span>
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
          />
        </div>
        <div slot='footer'>
          footer
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
        {alertStatus.message}
      </MSCustomAlert>
      <OrderDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </AddOrderWrapper>
  )
})

export default AddOrder
