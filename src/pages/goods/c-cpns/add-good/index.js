import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { ALERT_DURATION } from '@/common/constants'
import { checkEmptyString } from '@/utils/validate'
import { requestSortsAction } from '@/store/sorts'
import { requestColorsAction } from '@/store/colors'
import { requestGoods, requestAddGood } from '@/service/goods'

import { AddGoodWrapper } from './style'
import AddPageLayout from '@/layout/add-page'
import MSButton from '@/components/ms-button'
import MSCustomAlert from '@/components/ms-custom-alert'
import GoodsBody from './c-cpns/goods-body'

const AddGood = memo((props) => {
  const { history } = props

  const dispatch = useDispatch()
  const { sortList, colorList } = useSelector(state => ({
    sortList: state.getIn(['sorts', 'sortList']),
    colorList: state.getIn(['colors', 'colorList'])
  }), shallowEqual)

  const [goodsDetailInput, setGoodsDetailInput] = useState({
    factoryNum: {
      iid: 0,
      name: '廠商貨號',
      status: true,
      value: '',
      message: ''
    },
    goodsNum: {
      iid: 1,
      name: '商品貨號',
      status: true,
      value: '',
      message: ''
    },
    goodsName: {
      iid: 2,
      name: '商品名稱',
      status: true,
      value: '',
      message: ''
    },
    basePrice: {
      iid: 3,
      name: '成本價(人民幣)',
      status: true,
      value: '',
      message: '',
      isDisabled: false
    },
    officialPrice: {
      iid: 4,
      name: '售價',
      status: true,
      value: '',
      message: '',
      isShow: false
    }
  });
  const [sortSelect, setSortSelect] = useState('')
  const [colorsSelect, setColorsSelect] = useState([])
  const [sizeSelect, setSizeSelect] = useState([]);
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState({
    status: 'warning',
    message: ''
  })

  const handleSubmit = async () => {
    let isCompareGoodList = true
    let updatedState = goodsDetailInput
    for (const key in goodsDetailInput) {
      const isEmpty = checkEmptyString(goodsDetailInput[key].value)
      if (isEmpty) {
        updatedState = {
          ...updatedState,
          [key]: { ...goodsDetailInput[key], message: `${goodsDetailInput[key].name} 不得為空`, status: false }
        }
        isCompareGoodList = false
      } else {
        updatedState = {
          ...updatedState,
          [key]: { ...goodsDetailInput[key], message: '', status: true }
        }
      }
      setGoodsDetailInput({ ...updatedState })
    }
    if (
      isNaN(+(goodsDetailInput.basePrice.value)) ||
      (goodsDetailInput.basePrice.isDisabled && isNaN(+(goodsDetailInput.officialPrice.value)))
    ) {
      setGoodsDetailInput({
        ...updatedState,
        officialPrice: {
          ...updatedState.officialPrice, status: false, message: `${updatedState.officialPrice.name} 必須為數字`
        }
      })
      isCompareGoodList = false
    }
    if (checkEmptyString(sortSelect)) {
      setAlertStatus({ status: 'warning', message: '請選<擇檔期種類>' })
      setIsShowAlert(true)
      isCompareGoodList = false
    }
    if (colorsSelect.length === 0) {
      setAlertStatus({ status: 'warning', message: '請選<顏色>' })
      setIsShowAlert(true)
      isCompareGoodList = false
    }
    if (sizeSelect.length === 0) {
      setAlertStatus({ status: 'warning', message: '請選<尺寸>' })
      setIsShowAlert(true)
      isCompareGoodList = false
    }
    if (!goodsDetailInput.basePrice.isDisabled) {
      setAlertStatus({ status: 'warning', message: '請確認成本價(人民幣)是否正確，並輸入<售價>' })
      setIsShowAlert(true)
      isCompareGoodList = false
    }

    if (isCompareGoodList) {
      try {
        const res = await requestGoods('goods')
        for (const item of res.docs) {
          const goodsItem = item.data()
          if (goodsItem.factoryNum + '' === goodsDetailInput.factoryNum.value + '') {
            setAlertStatus({ status: 'warning', message: '該商品已被創建，請重新輸入廠商貨號' })
            setIsShowAlert(true)
            return;
          }
        }
        const data = {
          factoryNum: goodsDetailInput.factoryNum.value,
          goodsNum: goodsDetailInput.goodsNum.value,
          goodsName: goodsDetailInput.goodsName.value,
          basePrice: goodsDetailInput.basePrice.value,
          officialPrice: goodsDetailInput.officialPrice.value,
          sort: sortSelect,
          colors: colorsSelect,
          sizes: sizeSelect
        }
        await requestAddGood('goods', data.factoryNum, data)
        history.push('/goods')
      } catch (err) {
        window.alert('error message: ' + err)
        setAlertStatus({ status: 'error', message: err })
      }
    }
    updatedState = null
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setAlertStatus({ status: 'warning', message: '' })
    setIsShowAlert(false)
  }

  useEffect(() => {
    dispatch(requestSortsAction())
    dispatch(requestColorsAction())
  }, [dispatch])

  return (
    <AddGoodWrapper>
      <AddPageLayout>
        <div slot="header" style={{ fontSize: '24px' }}>新增商品</div>
        <div slot="body" className='layout-style'>
          <GoodsBody
            goodsDetailInput={goodsDetailInput}
            setGoodsDetailInput={setGoodsDetailInput}
            sortList={sortList}
            colorList={colorList}
            sortSelect={sortSelect}
            setSortSelect={setSortSelect}
            colorsSelect={colorsSelect}
            setColorsSelect={setColorsSelect}
            sizeSelect={sizeSelect}
            setSizeSelect={setSizeSelect}
          />
        </div>

        <div slot="footer">
          <MSButton
            style={{ marginRight: '10px' }}
            variant="outlined"
            color="error"
            value="cancel"
            onClick={e => history.push('/goods')}
          />
          <MSButton
            variant="outlined"
            color="success"
            value="confirm"
            onClick={handleSubmit}
          />
        </div>
      </AddPageLayout>
      <MSCustomAlert
        open={isShowAlert}
        autoHideDuration={ALERT_DURATION}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        severity={alertStatus.status}
        sx={{ width: '100%' }}
      >
        {alertStatus.message}
      </MSCustomAlert>
    </AddGoodWrapper>
  )
})

export default AddGood
