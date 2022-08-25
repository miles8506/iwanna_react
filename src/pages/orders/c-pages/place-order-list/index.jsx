import React, { useState, useEffect } from 'react'

import { requestGetOrders } from '@/service/order'

import { PlaceOrderListWrapper } from './style'
import MSButton from '@/components/ms-button'

const PlaceOrderList = (props) => {
  const { history } = props

  const [placeOrderList, setPlaceOrderList] = useState([]);

  const handlePlaceOrderList = async() => {
    const container = []
    const res = await requestGetOrders('orders')
    res.docs.forEach(item => {
      container.push(item.data())
    })
    setPlaceOrderList([...container])
  }

  const handleExportExcel = () => {
    console.log('excel')
  }

  useEffect(() => {
    handlePlaceOrderList()
  }, [])

  return (
    <PlaceOrderListWrapper>
      <div className="place-order">
        <div className="place-order-content">
          <div className="place-order-title">
            <h2>待叫貨清單</h2>
            <MSButton
              value="Export Excel"
              variant="outlined"
              color="info"
              onClick={() => handleExportExcel}
            />
          </div>
        </div>
        <div className="place-order-footer">
          <MSButton
            value="Return"
            variant="outlined"
            color="success"
            onClick={() => history.push('/orders')}
          />
        </div>
      </div>
    </PlaceOrderListWrapper>
  )
}

export default PlaceOrderList
