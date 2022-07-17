import React, { memo, useState, useCallback } from 'react'

import { checkEmptyString } from '@/utils/validate'

import { AddGoodWrapper } from './style'
import AddPageLayout from '@/layout/add-page'
import MSTextField from '@/components/ms-text-field'
import MSButton from '@/components/ms-button'


const AddGood = memo(() => {
  const [goodsDetailInput, setGoodsDetailInput] = useState({
    factoryNum: {
      iid: 0,
      name: '廠商貨號',
      status: true,
      value: ''
    },
    goodsNum: {
      iid: 1,
      name: '商品貨號',
      status: true,
      value: ''
    },
    goodsName: {
      iid: 2,
      name: '商品名稱',
      status: true,
      value: ''
    },
  });

  const handleSubmit = () => {

  }
  return (
    <AddGoodWrapper>
      <AddPageLayout>
        <div slot="header">header</div>
        <div slot="body">
          <h2>fac: {goodsDetailInput.factoryNum.value}</h2>
          <h2>goods: {goodsDetailInput.goodsNum.value}</h2>
          <h2>name: {goodsDetailInput.goodsName.value}</h2>
          <MSTextField
            iid={goodsDetailInput.factoryNum.iid}
            id="standard-required"
            label="廠商貨號"
            variant="standard"
            detail={goodsDetailInput}
            setValue={setGoodsDetailInput}
          />
          <MSTextField
            iid={goodsDetailInput.goodsNum.iid}
            id="standard-required"
            label="商品貨號"
            variant="standard"
            detail={goodsDetailInput}
            setValue={setGoodsDetailInput}
          />
          <MSTextField
            iid={goodsDetailInput.goodsName.iid}
            id="standard-required"
            label="商品貨號"
            variant="standard"
            detail={goodsDetailInput}
            setValue={setGoodsDetailInput}
          />
        </div>

        <div slot="footer">
          <MSButton
            style={{ marginRight: '10px' }}
            variant="outlined"
            color="error"
            value="cancel"
          />
          <MSButton
            variant="outlined"
            color="success"
            value="confirm"
            onClick={handleSubmit}
          />
        </div>
      </AddPageLayout>
    </AddGoodWrapper>
  )
})

export default AddGood
