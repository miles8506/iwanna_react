import React, { memo, useState } from 'react'

import {
  shipOrderOptions,
  callGoodsOptions,
  lastShipOrderDateOptions
} from './config'
import { filterOrderEnums } from '@/enums'

import { FunctionBarWrapper } from './style'
import MSButton from '@/components/ms-button'
import MSOnceSelect from '@/components/ms-once-select'
import CustomInput from '../custom-input'

const FunctionBar = memo((props) => {
  const { history, filterSearch, searchQueryUrl } = props

  // status
  const [shipOrderStatus, setShipOrderStatus] = useState(-1)
  const [callGoodsStatus, setCallGoodsStatus] = useState(-1)
  const [lastShipOrderDateStatus, setLastShipOrderDateStatus] = useState(-1)

  const [factoryNumber, setFactoryNumber] = useState('')
  const [goodsNumber, setGoodsNumber] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [buyerAccount, setBuyerAccount] = useState('')

  return (
    <FunctionBarWrapper>
      <div className="filter-area">
        <div className="filter-area-status">
          <MSOnceSelect
            value={callGoodsStatus}
            setValue={setCallGoodsStatus}
            options={callGoodsOptions}
            label="叫貨狀態"
            renderKey="name"
            valueKey="id"
            customStyle={{ width: '150px' }}
          />
          <MSOnceSelect
            value={shipOrderStatus}
            setValue={setShipOrderStatus}
            options={shipOrderOptions}
            label="出貨狀態"
            renderKey="name"
            valueKey="id"
            customStyle={{ width: '150px' }}
          />
          <MSOnceSelect
            value={lastShipOrderDateStatus}
            setValue={setLastShipOrderDateStatus}
            options={lastShipOrderDateOptions}
            label="最晚出貨日期"
            renderKey="name"
            valueKey="id"
            customStyle={{ width: '150px' }}
          />
          <MSButton
            value="Search"
            onClick={() =>
              filterSearch(filterOrderEnums.status, [
                shipOrderStatus,
                callGoodsStatus,
                lastShipOrderDateStatus
              ])
            }
          />
        </div>
        <div className="input-wrap">
          <div className="filter-area-input">
            <label htmlFor="factory-number">廠商貨號: </label>
            <CustomInput
              value={factoryNumber}
              change={setFactoryNumber}
              id="factory-number"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.factoryNumber, [factoryNumber])}
            />
          </div>
          <div className="filter-area-input">
            <label htmlFor="goods-number">商品貨號: </label>
            <CustomInput
              value={goodsNumber}
              change={setGoodsNumber}
              id="goods-number"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.goodsNumber, [goodsNumber])}
            />
          </div>
          <div className="filter-area-input">
            <label htmlFor="order-number">訂單編號: </label>
            <CustomInput
              value={orderNumber}
              change={setOrderNumber}
              id="order-number"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.orderNumber, [orderNumber])}
            />
          </div>
          <div className="filter-area-input">
            <label htmlFor="buyer-account">賣家帳號: </label>
            <CustomInput
              value={buyerAccount}
              change={setBuyerAccount}
              id="buyer-account"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.buyerAccount, [buyerAccount])}
            />
          </div>
        </div>
      </div>
      <div className="control-area">
        <MSButton
          value="新建訂單"
          // onClick={() => history.push({
          //   pathname: '/orders/add',
          //   search: searchQueryUrl
          // })}
          onClick={() => history.push('/orders/add')}
          style={{ width: '100%' }}
        />
        <MSButton
          value="待叫貨清單"
          onClick={() => history.push('/orders/placeOrderList')}
          style={{ width: '100%', marginTop: '10px' }}
        />
      </div>
    </FunctionBarWrapper>
  )
})

export default FunctionBar
