import React, { memo } from 'react'

import { sizeList } from '@/common/config'

import { GoodsBodyWrapper } from './style'
import MSTextField from '@/components/ms-text-field'
import MSSelect from '@/components/ms-select'

const GoodsBody = memo((props) => {
  const { goodsDetailInput, setGoodsDetailInput, sortSelect, setSortSelect, colorsSelect, setColorsSelect, sizeSelect, setSizeSelect, sortList, colorList } = props
  const {
    factoryNum,
    basePriceTW,
    basePriceRMB,
    lowestPrice,
    suggestPrice
  } = goodsDetailInput

  return (
    <GoodsBodyWrapper>
      <div className="factory-number item">
        <span className='factory-label'>{ factoryNum.name }：</span>
        <span className='factory-text'>{ factoryNum.value }</span>
      </div>
      <div className="goods-number item">
        <MSTextField
          iid={goodsDetailInput.goodsNum.iid}
          label="商品貨號"
          detail={goodsDetailInput}
          setValue={setGoodsDetailInput}
          status={goodsDetailInput.goodsNum.status}
          helperText={goodsDetailInput.goodsNum.message}
        />
      </div>
      <div className="goods-name item">
        <MSTextField
          iid={goodsDetailInput.goodsName.iid}
          label="商品名稱"
          detail={goodsDetailInput}
          setValue={setGoodsDetailInput}
          status={goodsDetailInput.goodsName.status}
          helperText={goodsDetailInput.goodsName.message}
        />
      </div>
      <div className='base-price-rmb item'>
        <span className="base-price-rmb-label">{ basePriceRMB.name }：</span>
        <span className="base-price-rmb-text">{ basePriceRMB.value }</span>
      </div>
      <div className='base-price-tw item'>
        <span className="base-price-tw-label">{ basePriceTW.name }：</span>
        <span className="base-price-tw-text">{ basePriceTW.value }</span>
      </div>
      <div className="lowest-price item">
        <span className="lowest-price-label">{ lowestPrice.name }：</span>
        <span className="lowest-price-text">{ lowestPrice.value }</span>
      </div>
      <div className="suggest-price item">
        <span className="suggest-price-label">{ suggestPrice.name }：</span>
        <span className="suggest-price-text">{ suggestPrice.value }</span>
      </div>
      <div className="official-price item">
      <MSTextField
          iid={goodsDetailInput.officialPrice.iid}
          label="售價"
          detail={goodsDetailInput}
          setValue={setGoodsDetailInput}
          status={goodsDetailInput.officialPrice.status}
          helperText={goodsDetailInput.officialPrice.message}
        />
      </div>
      <div className="sort-list item">
        <MSSelect
          value={sortSelect}
          setValue={setSortSelect}
          options={sortList}
          label='檔期種類'
          renderKey="sort"
        />
      </div>
      <div className="color-list item">
        <MSSelect
          value={colorsSelect}
          setValue={setColorsSelect}
          options={colorList}
          label="顏色"
          multiple={true}
          renderKey="color"
        />
      </div>
      <div className="size-list item">
        <MSSelect
          value={sizeSelect}
          setValue={setSizeSelect}
          options={sizeList}
          label="尺寸"
          multiple={true}
          renderKey="size"
        />
      </div>
    </GoodsBodyWrapper>
  )
})

export default GoodsBody
