import React, { memo, useState } from 'react'

import { formateStampTime } from '@/utils/time'

import { BaseDetailWrapper } from './style'
import Input from '@mui/material/Input'
import MSButton from '@/components/ms-button'
import MSDialog from '@/components/ms-dialog'

const BaseDetail = memo((props) => {
  const { orderDetail, changeShopeeOrderValue, confirmPlaceOrder } = props

  const [isShowDialog, setIsShowDialog] = useState(false);

  return (
    <BaseDetailWrapper>
      <div className='item'>訂單創建時間:
        <span>{formateStampTime(orderDetail.id)}</span>
      </div>
      <div className='item'>訂單編號:
        <span>{orderDetail.orderNumber}</span>
      </div>
      <div className='item'>蝦皮/IG訂單編號: <Input value={orderDetail.shopeeOrderNumber} onChange= {changeShopeeOrderValue} /></div>
      <div className='item'>買家帳號:
        <span>{orderDetail.buyerAccount}</span>
      </div>
      <div className='item'>最晚出貨日期:
        <span>{formateStampTime(orderDetail.lastShipmentDate, 'YYYY/MM/DD')}</span>
      </div>
      <div className='item'>訂單總金額:
        <span>{orderDetail.orderTotal}</span>
      </div>
      <div className='item'>叫貨狀態:
        <span>{orderDetail.placeOrderStatus ? '已叫貨' : '未叫貨'}</span>
        {
          !orderDetail.placeOrderStatus &&
          <MSButton
            style={{marginLeft: '20px'}}
            value="確認已叫貨"
            onClick={e => setIsShowDialog(true)}
          />
        }
      </div>
      <MSDialog
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
      ></MSDialog>
    </BaseDetailWrapper>
  )
})

export default BaseDetail
