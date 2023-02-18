import React, { useState, useEffect, useCallback } from 'react'

import { requestGetOrders } from '@/service/order'
import ExcelJs from 'exceljs'

import { PlaceOrderListWrapper } from './style'
import MSButton from '@/components/ms-button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const PlaceOrderList = (props) => {
  const { handlePlaceOrderDialog } = props

  const [placeOrderList, setPlaceOrderList] = useState([])
  const [TWTotal, setTWTotal] = useState(0)
  const [RMBTotal, setRMBTotal] = useState(0)

  const handlePlaceOrderList = async () => {
    const res = await requestGetOrders('orders')
    for (const item of res.docs) {
      const data = item.data()
      if (!data.placeOrderStatus) {
        for (const order of data.orderList) {
          setPlaceOrderList((prev) => {
            const isSame = prev.some(
              (item) => item.factoryNum === order.factoryNum && item.colors === order.colors && item.sizes === order.sizes
            )
            if (isSame) {
              const target = prev.find(item => item.factoryNum === order.factoryNum && item.colors === order.colors && item.sizes === order.sizes)
              target.count += Number(order.count)
              target.goodsTotal += order.goodsTotal
              return [...prev]
            } else {
              const newOrder = Object.assign({}, {
                factoryNum: order.factoryNum,
                sizes: order.sizes,
                colors: order.colors,
                count: Number(order.count),
                basePriceRMB: order.basePriceRMB,
                goodsName: order.goodsName,
                goodsNum: order.goodsNum,
                basePriceTW: order.basePriceTW,
                goodsTotal: order.goodsTotal,
              })
              return [...prev, newOrder]
            }
          })
        }
      }
    }
  }

  const handleTWTotal = useCallback(() => {
    let total = 0;
    for (const item of placeOrderList) {
      total += (item.basePriceTW * item.count)
    }
    return total
  }, [placeOrderList])

  const handleRMBTotal = useCallback(() => {
    let total = 0;

    for (const item of placeOrderList) {
      total = (item.basePriceRMB * item.count + Number(total)).toFixed(1)
    }

    return total
  }, [placeOrderList])

  const handleExportExcel = async () => {
    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('待叫貨清單')
    const rows = []
    for (const item of placeOrderList) {
      rows.push([`${item.factoryNum}  ${item.sizes}  ${item.colors}  *${item.count}`])
    }
    rows.push([`人民幣總金額：${RMBTotal}`], [`台幣總金額：${TWTotal}`])
    sheet.addTable({
      name: 'placeOrderTable',
      ref: 'A1',
      columns: [
        {
          name: '月_日_',
        }
      ],
      rows,
    })
    sheet.getCell('A1').font = {
      color: { rgba: '#000' },
    }
    sheet.getCell('A1').fill = {
      type: 'pattern',
      fgColor:{ rgba: '#fff' },
      bgColor: {rgba: '#fff' }
    }
    const res = await workbook.xlsx.writeBuffer()
    const aEl = document.createElement('a')
    const blobData = new Blob([res], {
      type: 'application/vnd.ms-excel;charset=utf-8;'
    })
    aEl.download = '待叫貨清單.xlsx'
    aEl.href = URL.createObjectURL(blobData)
    aEl.click()
  }

  useEffect(() => {
    setTWTotal(handleTWTotal())
    setRMBTotal(handleRMBTotal())
  }, [handleRMBTotal, handleTWTotal, placeOrderList])

  useEffect(() => {
    handlePlaceOrderList()
  }, [])

  return (
    <PlaceOrderListWrapper>
      <div className="place-order">
        <div className="place-order-content">
          <div className="place-order-title">
            <h2>
              <IconButton onClick={() => handlePlaceOrderDialog(false)}>
                <ArrowBackIosIcon />
              </IconButton>
              <span style={{ verticalAlign: 'middle' }}>待叫貨清單</span>
            </h2>
            <MSButton
              value="Export Excel"
              variant="outlined"
              color="info"
              onClick={handleExportExcel}
            />
          </div>
          <div className="list">
            <div className="header">
              <div className="index" style={{width: '5%'}}>序號</div>
              <div className="factory-number" style={{width: '10%'}}>廠商貨號</div>
              <div className="size" style={{width: '10%'}}>商品尺寸</div>
              <div className="color" style={{width: '10%'}}>商品顏色</div>
              <div className="count" style={{width: '10%'}}>商品數量</div>
              <div className="origin-price" style={{width: '10%'}}>商品成本</div>
              <div className="goods-name" style={{width: '25%'}}>商品名稱</div>
              <div className="goods-number" style={{width: '10%'}}>商品貨號</div>
              <div className="nt" style={{width: '10%'}}>換算台幣</div>
            </div>
            <div className="body">
              {placeOrderList.map((item, index) => (
                <div className='item' key={index}>
                  <div className="index-value" style={{width: '5%'}}>{ index + 1 }</div>
                  <div className="factory-number-value" style={{width: '10%'}}>{ item.factoryNum }</div>
                  <div className="size-value" style={{width: '10%'}}>{ item.sizes }</div>
                  <div className="color-value" style={{width: '10%'}}>{item.colors}</div>
                  <div className="count-value" style={{width: '10%'}}>{item.count}</div>
                  <div className="origin-price-value" style={{width: '10%'}}>{'¥' + (item.basePriceRMB * item.count)}</div>
                  <div className="goods-name-value" style={{width: '25%'}}>{item.goodsName}</div>
                  <div className="goods-number-value" style={{width: '10%'}}>{item.goodsNum}</div>
                  <div className="nt-value" style={{width: '10%'}}>{ '$' + (item.basePriceTW * item.count)}</div>
                </div>
              ))}
            </div>
            <div className="total">
              <h2>台幣總金額: { TWTotal }</h2>
              <h2>人民幣總金額: { RMBTotal }</h2>
            </div>
          </div>
        </div>
      </div>
    </PlaceOrderListWrapper>
  )
}

export default PlaceOrderList
