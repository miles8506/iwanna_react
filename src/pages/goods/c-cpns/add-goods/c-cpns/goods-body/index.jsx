import React, { memo, useState } from 'react'

import { sizeList } from '@/common/config'
import { checkEmptyString } from '@/utils/validate'

import { GoodsBodyWrapper } from './style'
import MSTextField from '@/components/ms-text-field'
import MSButton from '@/components/ms-button'
import DisplayInfoBox from '../display-price-box'
import MSSelect from '@/components/ms-select'
import MSDialog from '@/components/ms-dialog'

const GoodsBody = memo((props) => {
  const { goodsDetailInput, setGoodsDetailInput, sortList, colorList, sortSelect, setSortSelect, colorsSelect, setColorsSelect, sizeSelect, setSizeSelect } = props

  const [isShowDialog, setIsShowDialog] = useState(false);

  const confirmBasePrice = () => {
    setIsShowDialog(false)
    setGoodsDetailInput({
      ...goodsDetailInput,
      basePrice: { ...goodsDetailInput.basePrice, isDisabled: true },
      officialPrice: { ...goodsDetailInput.officialPrice, isShow: true }
    })
  }

  const verifyPrice = () => {
    if (checkEmptyString(goodsDetailInput.basePrice.value)) {
      setGoodsDetailInput({
        ...goodsDetailInput,
        basePrice: {
          ...goodsDetailInput.basePrice, status: false, message: `${goodsDetailInput.basePrice.name} 不得為空`
        }
      })
      return
    }
    if (isNaN(+(goodsDetailInput.basePrice.value))) {
      setGoodsDetailInput({
        ...goodsDetailInput,
        basePrice: {
          ...goodsDetailInput.basePrice, status: false, message: `${goodsDetailInput.basePrice.name} 必須為數字`
        }
      })
      return
    }
    setIsShowDialog(true)
    setGoodsDetailInput({
      ...goodsDetailInput,
      basePrice: {
        ...goodsDetailInput.basePrice, status: true, message: ''
      }
    })
  }

  const dialogFooter = () => {
    return (
      <>
        <MSButton
          variant="outlined"
          color="error"
          value="cancel"
          onClick={e => setIsShowDialog(false)}
        />
        <MSButton
          variant="outlined"
          color="success"
          value="confirm"
          onClick={confirmBasePrice}
        />
      </>
    )
  }

  return (
    <GoodsBodyWrapper>
      <MSTextField
        iid={goodsDetailInput.factoryNum.iid}
        label="廠商貨號"
        detail={goodsDetailInput}
        setValue={setGoodsDetailInput}
        status={goodsDetailInput.factoryNum.status}
        helperText={goodsDetailInput.factoryNum.message}
      />
      <MSTextField
        iid={goodsDetailInput.goodsNum.iid}
        label="商品貨號"
        detail={goodsDetailInput}
        setValue={setGoodsDetailInput}
        status={goodsDetailInput.goodsNum.status}
        helperText={goodsDetailInput.goodsNum.message}
      />
      <MSTextField
        iid={goodsDetailInput.goodsName.iid}
        label="商品名稱"
        detail={goodsDetailInput}
        setValue={setGoodsDetailInput}
        status={goodsDetailInput.goodsName.status}
        helperText={goodsDetailInput.goodsName.message}
      />
      <MSTextField
        iid={goodsDetailInput.basePrice.iid}
        label="成本價(人民幣)"
        detail={goodsDetailInput}
        setValue={setGoodsDetailInput}
        status={goodsDetailInput.basePrice.status}
        helperText={goodsDetailInput.basePrice.message}
        disabled={goodsDetailInput.basePrice.isDisabled}
      >
        <MSButton
          variant="outlined"
          color="info"
          value="confirm"
          style={{
            marginLeft: '20px',
            verticalAlign: 'bottom'
          }}
          onClick={verifyPrice}
          disabled={goodsDetailInput.basePrice.isDisabled}
        />
      </MSTextField>
      {
        goodsDetailInput.basePrice.isDisabled && <DisplayInfoBox price={goodsDetailInput.basePrice.value} />
      }
      {
        goodsDetailInput.officialPrice.isShow && (
          <MSTextField
            iid={goodsDetailInput.officialPrice.iid}
            label="售價"
            detail={goodsDetailInput}
            setValue={setGoodsDetailInput}
            status={goodsDetailInput.officialPrice.status}
            helperText={goodsDetailInput.officialPrice.message}
          />
        )
      }
      <MSSelect
        value={sortSelect}
        setValue={setSortSelect}
        options={sortList}
        label='檔期種類'
        renderKey="sort"
      />
      <MSSelect
        value={colorsSelect}
        setValue={setColorsSelect}
        options={colorList}
        label="顏色"
        multiple={true}
        renderKey="color"
      />
      <MSSelect
        value={sizeSelect}
        setValue={setSizeSelect}
        options={sizeList}
        label="尺寸"
        multiple={true}
        renderKey="size"
      />
      <MSDialog
        isShowDialog={isShowDialog}
        content={`確認成本價為${goodsDetailInput.basePrice.value}，確定後即不得再更改。`}
        footer={dialogFooter()}
      />
    </GoodsBodyWrapper>
  )
})

export default GoodsBody
