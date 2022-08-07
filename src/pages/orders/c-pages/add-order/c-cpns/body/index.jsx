import React, { memo, useState, useEffect } from 'react'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { requestOriginGoodsListAction } from '@/store/goods'
import { checkEmptyString } from '@/utils/validate'

import MSDatePicker from '@/components/ms-date-picker'
import MSTextField from '@/components/ms-text-field'
import MSButton from '@/components/ms-button'
import MSSelect from '@/components/ms-select'
import TextField from '@mui/material/TextField';
import { AddOrderBodyWrapper } from './style'

const AddOrderBody = memo((props) => {
  const dispatch = useDispatch()
  const { originGoodsList } = useSelector(state => ({
    originGoodsList: state.getIn(['goods', 'originGoodsList'])
  }), shallowEqual)

  const { baseOrdersDetailInput, setBaseOrderDetailInput, lastDateTime, setLastDateTime, sortSelect, setSortSelect, sortOptions, goodsName, setGoodsName,colorsSelect, setColorsSelect, sizesSelect, setSizesSelect, setIsShowAlert, setAlertStatus, pushOrderToOrderList, goodsFactoryNum, setGoodsFactoryNum,  goodsCount, setGoodsCount } = props

  const [isShowMainWrapper, setIsShowMainWrapper] = useState(true);
  const [currentGoods, setCurrentGoods] = useState({});
  const [isSearchFactoryNum, setIsSearchFactoryNum] = useState(false);

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
      sizesSelect.length === 0 ||
      checkEmptyString(goodsCount.goodsCount.value) ||
      Number(goodsCount.goodsCount.value) < 1
    ) {
      setIsShowAlert(true)
      setAlertStatus({
        status: 'warning',
        message: '請確認欄位是否已填入資料'
      })
      return
    }
    const { price, factoryNum } = currentGoods;
    // const { orderNumber, shopeeOrderNumber, buyerAccount } = baseOrdersDetailInput
    pushOrderToOrderList({
      // id: dayjs().valueOf(),
      // orderNumber: orderNumber.value,
      // shopeeOrderNumber: shopeeOrderNumber.value,
      // buyerAccount: buyerAccount.value,
      // lastShipmentDate: dayjs(lastDateTime.value).valueOf(),
      goodsName,
      sort: sortSelect,
      colors: colorsSelect,
      sizes: sizesSelect,
      status: false,
      suggestPrice: price.suggestPrice,
      count: goodsCount,
      factoryNum,
    })
    console.log(123);
    console.log(currentGoods)
    setCurrentGoods({})
  }

  const searchGoods = () => {
    const result = originGoodsList.find(item => item.factoryNum === goodsFactoryNum.goodsFactoryNum.value)
    if (!result) {
      setGoodsFactoryNum({
        goodsFactoryNum: {
          ...goodsFactoryNum.goodsFactoryNum,
          status: false,
          message: '查無此商品'
        }
      })
    } else {
      setIsSearchFactoryNum(true)
      setGoodsFactoryNum({
        goodsFactoryNum: {
          ...goodsFactoryNum.goodsFactoryNum,
          status: true,
          message: ''
        }
      })
      const { sort, goodsName } = result
      setSortSelect(sort)
      setCurrentGoods(result)
      setGoodsName(goodsName)
    }
  }

  useEffect(() => {
    if (sortSelect.trim() === '') {
      dispatch(requestOriginGoodsListAction())
    }

    if (isSearchFactoryNum) {
      const result = originGoodsList.find(item => item.factoryNum === goodsFactoryNum.goodsFactoryNum.value)
      result && setGoodsName(result.goodsName)
      setIsSearchFactoryNum(false)
    } else {
      setGoodsName('')
    }

    setColorsSelect('')
    setSizesSelect('')
    setCurrentGoods(null)
  }, [sortSelect, dispatch])

  useEffect(() => {
    if (goodsName.trim() !== '') {
      const res = originGoodsList.find(item => item.goodsName === goodsName && item.sort === sortSelect)
      setCurrentGoods({ ...res })
      setColorsSelect('')
      setSizesSelect('')
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
        <MSButton
          value="confirm"
          color="info"
          onClick={verifyBaseInfo}
          disabled={isShowMainWrapper}
        />
      </div>
      {
        isShowMainWrapper && (
          <>
            <div className="factory-num-search">
              <MSTextField
                iid={goodsFactoryNum.goodsFactoryNum.iid}
                label={goodsFactoryNum.goodsFactoryNum.name}
                detail={goodsFactoryNum}
                setValue={setGoodsFactoryNum}
                status={goodsFactoryNum.goodsFactoryNum.status}
                helperText={goodsFactoryNum.goodsFactoryNum.message}
                required={false}
              />
              <MSButton
                value="Search"
                style={{ height: '35px' }}
                onClick={searchGoods}
              />
            </div>
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
            <MSSelect
              value={colorsSelect}
              setValue={setColorsSelect}
              options={formatColorsOptions(currentGoods?.colors)}
              label='顏色'
              renderKey="color"
            />
            <MSSelect
              value={sizesSelect}
              setValue={setSizesSelect}
              options={formatSizesOptions(currentGoods?.sizes)}
              label='尺寸'
              renderKey="size"
            />
            <MSTextField
              iid={goodsCount.goodsCount.iid}
              label={goodsCount.goodsCount.name}
              detail={goodsCount}
              setValue={setGoodsCount}
              status={goodsCount.goodsCount.status}
              helperText={goodsCount.goodsCount.message}
              required={false}
              type="number"
            />
            {/* <MSSelect
              value={goodsCount}
              setValue={setSizesSelect}
              options={formatSizesOptions(currentGoods?.sizes)}
              label='尺寸'
              multiple={true}
              renderKey="size"
            /> */}
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
