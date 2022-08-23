import React, { memo, useState } from 'react'

import { FunctionBarWrapper } from './style'
import MSButton from '@/components/ms-button'
import MSOnceSelect from '@/components/ms-once-select'


const shipOrderOptions = [
  { name: 'All', id: -1 },
  { name: '未出貨', id: 0 },
  { name: '可出貨', id: 1 },
  { name: '已出貨', id: 2 }
]
const callGoodsOptions = [
  { name: 'All', id: -1 },
  { name: '未叫貨', id: 0 },
  { name: '已叫貨', id: 1 }
]
const lastShipOrderDateOptions = [
  { name: '早 -> 晚', id: 0 },
  { name: '晚 -> 早', id: 1 }
]

const FunctionBar = memo((props) => {
  const { history } = props

  const [shipOrderStatus, setShipOrderStatus] = useState(-1)
  const [callGoodsStatus, setCallGoodsStatus] = useState(-1)
  const [lastShipOrderDateStatus, setLastShipOrderDateStatus] = useState(0)

  return (
    <FunctionBarWrapper>
      <div className="filter-area">
        <MSOnceSelect
          value={shipOrderStatus}
          setValue={setShipOrderStatus}
          options={shipOrderOptions}
          label="出貨狀態"
          renderKey="name"
          valueKey="id"
        />
        <MSOnceSelect
          value={callGoodsStatus}
          setValue={setCallGoodsStatus}
          options={callGoodsOptions}
          label="叫貨狀態"
          renderKey="name"
          valueKey="id"
        />
        <MSOnceSelect
          value={lastShipOrderDateStatus}
          setValue={setLastShipOrderDateStatus}
          options={lastShipOrderDateOptions}
          label="最晚出貨日期"
          renderKey="name"
          valueKey="id"
        />
      </div>
      <div className="control-area">
        <MSButton
          value="新建訂單"
          onClick={(e) => history.push('/orders/add')}
          style={{ width: '100%' }}
        />
      </div>
    </FunctionBarWrapper>
  )
})

export default FunctionBar
