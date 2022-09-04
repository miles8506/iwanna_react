import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { ALERT_DURATION } from '@/common/constants'
import { requestGoods, requestAddGood } from '@/service/goods'
import { requestSortsAction } from '@/store/sorts'
import { requestColorsAction } from '@/store/colors'
import { checkEmptyString } from '@/utils/validate'
import { computedBasePrice, computedOfficialPrice, computedSuggestPrice } from '@/utils/price'

import { EditGoodWrapper } from './style'
import BaseLayout from '@/layout/base-page'
import GoodsBody from './goods-body'
import MSButton from '@/components/ms-button'
import MSCustomAlert from '@/components/ms-custom-alert'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const EditGood = memo((props) => {
  const { handleEditGoodsDialog, factoryNum } = props
  // const { factoryNum } = props.match.params

  const dispatch = useDispatch()
  const { sortList, colorList } = useSelector(state => ({
    sortList: state.getIn(['sorts', 'sortList']),
    colorList: state.getIn(['colors', 'colorList'])
  }), shallowEqual)

  const [goodsDetailInput, setGoodsDetailInput] = useState({
    factoryNum: {
      name: '廠商貨號',
      value: ''
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
    basePriceRMB: {
      name: '成本價(人民幣)',
      value: ''
    },
    basePriceTW: {
      name: '成本價(台幣)',
      value: ''
    },
    lowestPrice: {
      name: '最低售價',
      value: ''
    },
    suggestPrice: {
      name: '建議售價',
      value: ''
    },
    officialPrice: {
      name: '售價',
      status: true,
      value: ''
    }
  })
  const [sortSelect, setSortSelect] = useState('')
  const [colorsSelect, setColorsSelect] = useState([])
  const [sizeSelect, setSizeSelect] = useState([])
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState({
    status: 'warning',
    message: ''
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setAlertStatus({ status: 'warning', message: '' })
    setIsShowAlert(false)
  }

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
    if (isNaN(+(goodsDetailInput.officialPrice.value))) {
      setGoodsDetailInput({
        ...updatedState,
        officialPrice: {
          ...updatedState.officialPrice, status: false, message: `${updatedState.officialPrice.name} 必須為數字`
        }
      })
      isCompareGoodList = false
    }
    if (isCompareGoodList) {
      const data = {
        factoryNum: goodsDetailInput.factoryNum.value,
        goodsNum: goodsDetailInput.goodsNum.value,
        goodsName: goodsDetailInput.goodsName.value,
        sort: sortSelect,
        colors: colorsSelect,
        sizes: sizeSelect,
        price: {
          basePriceRMB: goodsDetailInput.basePriceRMB.value,
          basePriceTW: computedBasePrice(goodsDetailInput.basePriceRMB.value),
          lowestPrice: computedOfficialPrice(goodsDetailInput.basePriceRMB.value),
          suggestPrice: computedSuggestPrice(goodsDetailInput.basePriceRMB.value),
          officialPrice: goodsDetailInput.officialPrice.value
        }
      }
      await requestAddGood('goods', data.factoryNum, data)
      handleEditGoodsDialog()
    }
  }

  useEffect(() => {
    dispatch(requestSortsAction())
    dispatch(requestColorsAction())
  }, [dispatch])

  useEffect(() => {
    requestGoods('goods').then(res => {
      const target = res.docs.find(item => item.data().factoryNum === factoryNum).data()
      setGoodsDetailInput({
        goodsNum: {
          ...goodsDetailInput.goodsNum,
          value: target.goodsNum
        },
        goodsName: {
          ...goodsDetailInput.goodsName,
          value: target.goodsName
        },
        factoryNum: {
          ...goodsDetailInput.factoryNum,
          value: target.factoryNum
        },
        officialPrice: {
          ...goodsDetailInput.officialPrice,
          value: target.price.officialPrice
        },
        basePriceRMB: {
          ...goodsDetailInput.basePriceRMB,
          value: target.price.basePriceRMB,
        },
        basePriceTW: {
          ...goodsDetailInput.basePriceTW,
          value: target.price.basePriceTW
        },
        lowestPrice: {
          ...goodsDetailInput.lowestPrice,
          value: target.price.lowestPrice
        },
        suggestPrice: {
          ...goodsDetailInput.suggestPrice,
          value: target.price.suggestPrice
        }
      })
      setSortSelect(target.sort)
      setColorsSelect([...target.colors])
      setSizeSelect([...target.sizes])
    })
  }, []);

  return (
    <EditGoodWrapper>
      <BaseLayout>
        <div slot='header' style={{ fontSize: '24px' }}>
          <IconButton
            onClick={handleEditGoodsDialog}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <span style={{verticalAlign: 'middle'}}>編輯商品</span>
        </div>
        <div slot='body'>
          <GoodsBody
            goodsDetailInput={goodsDetailInput}
            setGoodsDetailInput={setGoodsDetailInput}
            sortSelect={sortSelect}
            setSortSelect={setSortSelect}
            colorsSelect={colorsSelect}
            setColorsSelect={setColorsSelect}
            sizeSelect={sizeSelect}
            setSizeSelect={setSizeSelect}
            sortList={sortList}
            colorList={colorList}
          />
        </div>
        <div slot='footer'>
        <MSButton
            style={{ marginRight: '10px' }}
            variant="outlined"
            color="error"
            value="cancel"
            onClick={handleEditGoodsDialog}
          />
          <MSButton
            variant="outlined"
            color="success"
            value="confirm"
            onClick={handleSubmit}
          />
        </div>
      </BaseLayout>
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
    </EditGoodWrapper>
  )
})

export default EditGood
