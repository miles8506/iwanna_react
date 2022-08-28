import React, { memo, useEffect, useState, useCallback } from 'react'

import { requestGetOrder, requestUpdateOrder } from '@/service/order'

import { EditOrderWrapper } from './style'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import BasePageLayout from '@/layout/base-page'
import BaseDetail from './c-cpns/base-detail'
import MSButton from '@/components/ms-button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const EditOrder = memo((props) => {
  const { iid, handleOrderDialog } = props

  const [orderDetail, setOrderDetail] = useState(null);

  const getOrderDetail = useCallback(async () => {
    const res = await requestGetOrder('orders', 'id', '==', Number(iid))
    res.docs.forEach(item => {
      setOrderDetail(item.data())
    })
  }, [iid])

  const changeOrderNumberValue = useCallback((e) => {
    setOrderDetail({
      ...orderDetail,
      orderNumber: e.target.value
    })
  }, [orderDetail])

  const changeAreaValue = useCallback((e, id) => {
    const targetIndex = orderDetail.orderList.findIndex(item => item.id === id)
    const targetGoods = orderDetail.orderList.find(item => item.id === id)
    const shallowCopyOrderDetail = orderDetail.orderList
    shallowCopyOrderDetail.splice(targetIndex, 1, { ...targetGoods, remark: e.target.value })
    setOrderDetail({
      ...orderDetail,
      orderList: [...shallowCopyOrderDetail]
    })
  }, [orderDetail])

  const confirmPlaceOrder = (setIsShowDialog) => {
    setOrderDetail({
      ...orderDetail,
      placeOrderStatus: true
    })
    setIsShowDialog(false)
  }

  const changeChecked = (e, id) => {
    const targetIndex = orderDetail.orderList.findIndex(item => item.id === id)
    const targetGoods = orderDetail.orderList.find(item => item.id === id)
    const shallowCopyOrderDetail = orderDetail.orderList
    shallowCopyOrderDetail.splice(targetIndex, 1, { ...targetGoods, status: e.target.checked })
    setOrderDetail({
      ...orderDetail,
      orderList: [...shallowCopyOrderDetail]
    })
  }

  const submitOrder = async () => {
    if (orderDetail.orderCurryStatus === 2) {
      await requestUpdateOrder('orders', iid.toString(), { ...orderDetail, orderCurryStatus: 2 })
      handleOrderDialog()
      return
    }

    const res = orderDetail.orderList.some(item => item.status === false)
    if (res) {
      await requestUpdateOrder('orders', iid.toString(), { ...orderDetail, orderCurryStatus: 0 })
    } else {
      await requestUpdateOrder('orders', iid.toString(), { ...orderDetail, orderCurryStatus: 1 })
    }
    handleOrderDialog()
  }

  useEffect(() => {
    getOrderDetail()
  }, [getOrderDetail])

  if (!orderDetail) {
    return <div>No Data</div>
  }

  return (
    <EditOrderWrapper>
      <BasePageLayout>
        <div slot='header'>
          <IconButton
            onClick={() => handleOrderDialog()}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <span style={{verticalAlign: 'middle'}}>編輯訂單</span>
        </div>
        <div slot='body'>
          <BaseDetail
            orderDetail={orderDetail}
            changeOrderNumberValue={changeOrderNumberValue}
            confirmPlaceOrder={confirmPlaceOrder}
          />
          {
            orderDetail.orderList.map(item => {
              return (
                <div key={item.id} className="goods">
                  <div>
                    出貨狀態:
                    <Checkbox
                      disabled={!orderDetail.placeOrderStatus || orderDetail.orderCurryStatus === 2}
                      checked={item.status}
                      onChange={e => changeChecked(e, item.id)}
                      style={{ padding: '5px' }}
                    />
                  </div>
                  <div className='item'>商品名稱: <span>{item.goodsName}</span></div>
                  <div className='item'>廠商貨號: <span>{item.factoryNum}</span></div>
                  <div className='item'>商品貨號: <span>{item.goodsNum}</span></div>
                  <div className='item'>尺寸: <span>{item.sizes}</span></div>
                  <div className='item'>顏色: <span>{item.colors}</span></div>
                  <div className='item'>數量: <span>{item.count}</span></div>
                  <div className='item'>價錢: <span>{item.goodsTotal}</span></div>
                  <TextareaAutosize
                    style={{ width: '35%', height: '100px', resize: 'none' }}
                    value={item.remark}
                    onChange={(e) => changeAreaValue(e, item.id)}
                  />
                </div>
              )
            })
          }
        </div>
        <div slot='footer'>
        <MSButton
            style={{ marginRight: '10px' }}
            value="cancel"
            variant="outlined"
            color="error"
            onClick={() => handleOrderDialog()}
          />
          <MSButton
            value="confirm"
            variant="outlined"
            color="success"
            onClick={submitOrder}
          />
        </div>
      </BasePageLayout>
    </EditOrderWrapper>
  )
})

export default EditOrder
