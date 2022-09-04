import React, { memo } from 'react'

import {
  shipOrderOptions,
  callGoodsOptions,
  lastShipOrderDateOptions
} from './config'
import { filterOrderEnums } from '@/enums'

import { useOrderSearchContext } from '@/context/use-order-search'
import { FunctionBarWrapper } from './style'
import MSButton from '@/components/ms-button'
import MSOnceSelect from '@/components/ms-once-select'
import CustomInput from '../custom-input'

const FunctionBar = memo((props) => {
  const { history, filterSearch, setOpenOrderDialog, handlePlaceOrderDialog } = props

  const {
    shipOrderStatus,
    callGoodsStatus,
    lastShipOrderDateStatus,
    factoryNumber,
    goodsNumber,
    orderNumber,
    buyerAccount,
    handleShipOrderStatus,
    handleCallGoodsStatus,
    handleLastShipOrderDateStatus,
    handleFactoryNumber,
    handleGoodsNumber,
    handleOrderNumber,
    handleBuyerAccount
  } = useOrderSearchContext()

  return (
    <FunctionBarWrapper>
      <div className="filter-area">
        <div className="filter-area-status">
          <MSOnceSelect
            value={callGoodsStatus}
            setValue={handleCallGoodsStatus}
            options={callGoodsOptions}
            label="叫貨狀態"
            renderKey="name"
            valueKey="id"
            customStyle={{ width: '150px' }}
          />
          <MSOnceSelect
            value={shipOrderStatus}
            setValue={handleShipOrderStatus}
            options={shipOrderOptions}
            label="出貨狀態"
            renderKey="name"
            valueKey="id"
            customStyle={{ width: '150px' }}
          />
          <MSOnceSelect
            value={lastShipOrderDateStatus}
            setValue={handleLastShipOrderDateStatus}
            options={lastShipOrderDateOptions}
            label="最晚出貨日期"
            renderKey="name"
            valueKey="id"
            customStyle={{ width: '150px' }}
          />
          <MSButton
            value="Search"
            onClick={() =>
              filterSearch(filterOrderEnums.status)
            }
          />
        </div>
        <div className="input-wrap">
          <div className="filter-area-input">
            <label htmlFor="factory-number">廠商貨號: </label>
            <CustomInput
              value={factoryNumber}
              change={handleFactoryNumber}
              id="factory-number"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.factoryNumber)}
            />
          </div>
          <div className="filter-area-input">
            <label htmlFor="goods-number">商品貨號: </label>
            <CustomInput
              value={goodsNumber}
              change={handleGoodsNumber}
              id="goods-number"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.goodsNumber)}
            />
          </div>
          <div className="filter-area-input">
            <label htmlFor="order-number">訂單編號: </label>
            <CustomInput
              value={orderNumber}
              change={handleOrderNumber}
              id="order-number"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.orderNumber)}
            />
          </div>
          <div className="filter-area-input">
            <label htmlFor="buyer-account">賣家帳號: </label>
            <CustomInput
              value={buyerAccount}
              change={handleBuyerAccount}
              id="buyer-account"
            />
            <MSButton
              value="Search"
              style={{ marginLeft: '10px' }}
              onClick={() => filterSearch(filterOrderEnums.buyerAccount)}
            />
          </div>
        </div>
      </div>
      <div className="control-area">
        <MSButton
          value="新建訂單"
          onClick={() => setOpenOrderDialog(true)}
          style={{ width: '100%' }}
        />
        <MSButton
          value="待叫貨清單"
          onClick={() => handlePlaceOrderDialog(true)}
          style={{ width: '100%', marginTop: '10px' }}
        />
      </div>
    </FunctionBarWrapper>
  )
})

export default FunctionBar
