import React, { memo } from 'react'

import { headerCells } from './config'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'

import { ThemeProvider } from '@mui/material'
import { GoodsWrapper } from './style'
import MSTable from '@/components/ms-table'


export default memo(function Goods() {
  const res = [{
    id: '001',
    factoryNum: '6069蕾絲裙',
    goodsNum: '2203221',
    goodsName: '仙氣飄飄的千群仙氣飄飄的千群仙氣飄飄的千群仙氣飄飄的千群仙氣飄飄的千群仙氣飄飄的千群仙氣飄飄的千群仙氣飄飄的千群',
    sort: '0325',
    colors: 'F',
    sizes: 'S M',
    basePrice: '94',
    officialPrice: '130',
    control: <button>123</button>
  }]
  const theme = useCreateMUITheme()
  return (
    <GoodsWrapper>
      <ThemeProvider theme={theme}>
        <div className="filter-bar"></div>
        <div className="goods-content">
          <MSTable rows={res} headerCells={headerCells} />
        </div>
      </ThemeProvider>
    </GoodsWrapper>
  )
})
