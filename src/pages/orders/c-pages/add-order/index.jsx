import React, { memo, useState } from 'react'

import { AddOrderWrapper } from './style'
import BasePageLayout from '@/layout/base-page'
import AddOrderBody from './c-cpns/body'

const AddOrder = memo(() => {
  const [ordersDetailInput, setOrderDetailInput] = useState({
    orderNumber: {
      iid: 0,
      name: '訂單編號',
      status: true,
      value: '',
      message: ''
    },
    shopeeOrderNumber: {
      iid:1,
      name: '蝦皮訂單帳號',
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
  });
  const [lastDateTime, setLastDateTime] = useState({
    status: true,
    value: '',
    message: ''
  });

  return (
    <AddOrderWrapper>
      <BasePageLayout>
        <div slot='header' style={{fontSize: '24px', color: 'rgba(0,0,0,0.6)'}}>
          新建訂單
        </div>
        <div slot='body'>
          <AddOrderBody
            ordersDetailInput={ordersDetailInput}
            setOrderDetailInput={setOrderDetailInput}
            lastDateTime={lastDateTime}
            setLastDateTime={setLastDateTime}
          />
        </div>
        <div slot='footer'>
          footer
        </div>
      </BasePageLayout>
    </AddOrderWrapper>
  )
})

export default AddOrder
