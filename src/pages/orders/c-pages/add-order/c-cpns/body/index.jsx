import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { requestOriginGoodsListAction } from '@/store/goods'
import { checkEmptyString } from '@/utils/validate'

import MSDatePicker from '@/components/ms-date-picker'
import MSTextField from '@/components/ms-text-field'
import MSButton from '@/components/ms-button'
import MSSelect from '@/components/ms-select'
import { AddOrderBodyWrapper } from './style'

const AddOrderBody = memo((props) => {
  const dispatch = useDispatch()
  const { originGoodsList } = useSelector(state => ({
    originGoodsList: state.getIn(['goods', 'originGoodsList'])
  }), shallowEqual)

  const { baseOrdersDetailInput, setBaseOrderDetailInput, lastDateTime, setLastDateTime, sortSelect, setSortSelect, sortOptions, goodsName, setGoodsName,colorsSelect, setColorsSelect, sizesSelect, setSizesSelect, setIsShowAlert, setAlertStatus } = props

  const [isShowMainWrapper, setIsShowMainWrapper] = useState(true);
  const [currentGoods, setCurrentGoods] = useState({});

  const verifyBaseInfo = () => {
    let isShowMainOrderWrap = true
    let updateState = baseOrdersDetailInput
    for (const key in baseOrdersDetailInput) {
      const isEmpty = checkEmptyString(baseOrdersDetailInput[key].value)
      if (isEmpty) {
        updateState = {
          ...updateState,
          [key]: {
            ...baseOrdersDetailInput[key],
            status: false,
            message: `${baseOrdersDetailInput[key].name}不得為空`
          }
        }
        isShowMainOrderWrap = false
      } else {
        updateState = {
          ...updateState,
          [key]: {
            ...baseOrdersDetailInput[key],
            status: true,
            message: ''
          }
        }
      }
    }
    setBaseOrderDetailInput({ ...updateState })

    if (checkEmptyString(lastDateTime.value)) {
      setLastDateTime({ ...lastDateTime, status: false, message: `${lastDateTime.name}不得為空` })
      isShowMainOrderWrap = false
    } else {
      setLastDateTime({ ...lastDateTime, status: true, message: '' })
    }
    isShowMainOrderWrap && setIsShowMainWrapper(isShowMainOrderWrap)
  }

  const filterCurrentGoodsList = (goodsList) => goodsList.filter(item => item.sort === sortSelect)

  const formatColorsOptions = (colors = []) => colors.map(item => Object.assign({}, { color: item }))

  const formatSizesOptions = (sizes = []) => sizes.map(item => Object.assign({}, { size: item }))

  const handleOrder = () => {
    if (
      checkEmptyString(goodsName) ||
      checkEmptyString(sortSelect) ||
      colorsSelect.length === 0 ||
      sizesSelect.length === 0
    ) {
      setIsShowAlert(true)
      setAlertStatus({
        status: 'warning',
        message: '請確認欄位是否已填入資料'
      })
      return
    }
  }


  useEffect(() => {
    if (sortSelect.trim() === '') {
      dispatch(requestOriginGoodsListAction())
    }
    setGoodsName('')
    setColorsSelect([])
    setSizesSelect([])
    setCurrentGoods(null)
    console.log('change');
  }, [sortSelect, dispatch])

  useEffect(() => {
    if (goodsName.trim() !== '') {
      const res = originGoodsList.find(item => item.goodsName === goodsName && item.sort === sortSelect)
      setCurrentGoods({ ...res })
      setColorsSelect([])
      setSizesSelect([])
    }
  }, [goodsName])

  return (
    <AddOrderBodyWrapper>
      <MSTextField
        iid={baseOrdersDetailInput.orderNumber.iid}
        label={baseOrdersDetailInput.orderNumber.name}
        detail={baseOrdersDetailInput}
        setValue={setBaseOrderDetailInput}
        status={baseOrdersDetailInput.orderNumber.status}
        helperText={baseOrdersDetailInput.orderNumber.message}
        disabled={isShowMainWrapper}
      />
      <MSTextField
        iid={baseOrdersDetailInput.shopeeOrderNumber.iid}
        label={baseOrdersDetailInput.shopeeOrderNumber.name}
        detail={baseOrdersDetailInput}
        setValue={setBaseOrderDetailInput}
        status={baseOrdersDetailInput.shopeeOrderNumber.status}
        helperText={baseOrdersDetailInput.shopeeOrderNumber.message}
        disabled={isShowMainWrapper}
      />
      <MSTextField
        iid={baseOrdersDetailInput.buyerAccount.iid}
        label={baseOrdersDetailInput.buyerAccount.name}
        detail={baseOrdersDetailInput}
        setValue={setBaseOrderDetailInput}
        status={baseOrdersDetailInput.buyerAccount.status}
        helperText={baseOrdersDetailInput.buyerAccount.message}
        disabled={isShowMainWrapper}
      />
      <MSDatePicker
        label={lastDateTime.name}
        dateState={lastDateTime}
        setDateState={setLastDateTime}
        disabled={isShowMainWrapper}
      />
      <div className="confirm-bar">
        <MSButton value="confirm" color="info" onClick={verifyBaseInfo} />
      </div>
      {
        isShowMainWrapper && (
          <>
            <MSSelect
              value={sortSelect}
              setValue={setSortSelect}
              options={sortOptions}
              label='檔期種類'
              renderKey="sort"
            />
            <MSSelect
              value={goodsName}
              setValue={setGoodsName}
              options={filterCurrentGoodsList(originGoodsList)}
              label='商品名稱'
              renderKey="goodsName"
              idName="factoryNum"
              getIdName={id => console.log(id)}
            />
            <div className="factory-num">
              <div className="factory-num-label">商品貨號：</div>
              <div className="factory-num-text">{currentGoods?.factoryNum ?? null}</div>
            </div>
            <MSSelect
              value={colorsSelect}
              setValue={setColorsSelect}
              options={formatColorsOptions(currentGoods?.colors)}
              label='顏色'
              multiple={true}
              renderKey="color"
            />
            <MSSelect
              value={sizesSelect}
              setValue={setSizesSelect}
              options={formatSizesOptions(currentGoods?.sizes)}
              label='尺寸'
              multiple={true}
              renderKey="size"
            />
            <div className="add-order-btn">
              <MSButton
                value="Add Order"
                color="info"
                onClick={handleOrder}
              />
            </div>
          </>
        )
      }
    </AddOrderBodyWrapper>
  )
})

export default AddOrderBody
