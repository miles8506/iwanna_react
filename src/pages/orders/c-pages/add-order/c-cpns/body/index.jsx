import React, { memo } from 'react'

import { AddOrderBodyWrapper } from './style'
import MSTextField from '@/components/ms-text-field'
import MSDatePicker from '@/components/ms-date-picker'

const AddOrderBody = memo((props) => {
  const { ordersDetailInput, setOrderDetailInput, lastDateTime, setLastDateTime } = props

  return (
    <AddOrderBodyWrapper>
      <MSTextField
        iid={ordersDetailInput.orderNumber.iid}
        label={ordersDetailInput.orderNumber.name}
        detail={ordersDetailInput}
        setValue={setOrderDetailInput}
        status={ordersDetailInput.orderNumber.status}
        helperText={ordersDetailInput.orderNumber.message}
      />
      <MSTextField
        iid={ordersDetailInput.shopeeOrderNumber.iid}
        label={ordersDetailInput.shopeeOrderNumber.name}
        detail={ordersDetailInput}
        setValue={setOrderDetailInput}
        status={ordersDetailInput.shopeeOrderNumber.status}
        helperText={ordersDetailInput.shopeeOrderNumber.message}
      />
      <MSTextField
        iid={ordersDetailInput.buyerAccount.iid}
        label={ordersDetailInput.buyerAccount.name}
        detail={ordersDetailInput}
        setValue={setOrderDetailInput}
        status={ordersDetailInput.buyerAccount.status}
        helperText={ordersDetailInput.buyerAccount.message}
      />
      <MSDatePicker
        label="最晚出貨日期"
        dateState={lastDateTime}
        setDateState={setLastDateTime}
      />
    </AddOrderBodyWrapper>
  )
})

export default AddOrderBody
