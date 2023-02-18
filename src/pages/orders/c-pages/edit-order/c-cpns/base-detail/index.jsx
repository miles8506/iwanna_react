import React, { memo, useState } from 'react'

import { formateStampTime } from '@/utils/time'
import { ALERT_DURATION } from '@/common/constants'
import copyText from '@/utils/useCopyText'

import { BaseDetailWrapper } from './style'
import Input from '@mui/material/Input'
import MSButton from '@/components/ms-button'
import MSDialog from '@/components/ms-dialog'
import MSCustomAlert from '@/components/ms-custom-alert'

const BaseDetail = memo((props) => {
  const { orderDetail, changeOrderNumberValue, confirmPlaceOrder } = props

  const [isShowDialog, setIsShowDialog] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState(false)

  const copyOrderNumber = () => {
    copyText('.order-number > input')
    setIsShowAlert(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setIsShowAlert(false)
  }
  return (
    <BaseDetailWrapper>
      <MSCustomAlert
        open={isShowAlert}
        autoHideDuration={ALERT_DURATION}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        severity="info"
        sx={{ width: '100%' }}
      >
        訂單編號已複製。
      </MSCustomAlert>
      <div className='item'>
        訂單創建時間: <span>{formateStampTime(orderDetail.id)}</span>
      </div>
      <div className='item'>
        訂單編號: <Input value={orderDetail.orderNumber} onChange={changeOrderNumberValue} className="order-number" />
        <MSButton value="複製" style={{ marginLeft: '10px' }} onClick={copyOrderNumber} />
      </div>
      <div className='item'>
        買家帳號: {orderDetail.buyerAccount}
      </div>
      <div className='item'>
        最晚出貨日期: {formateStampTime(orderDetail.lastShipmentDate, 'YYYY/MM/DD')}
      </div>
      <div className='item'>
        訂單總金額: {orderDetail.orderTotal}
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
