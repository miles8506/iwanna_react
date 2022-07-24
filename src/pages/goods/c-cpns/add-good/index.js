import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { ALERT_DURATION } from '@/common/constants'
import { checkEmptyString } from '@/utils/validate'
import { computedBasePrice, computedOfficialPrice } from '@/utils/price'
import { requestSortsAction } from '@/store/sorts'
import { requestColorsAction } from '@/store/colors'
import { sizeList } from '@/common/config'
import { requestGoods, requestAddGood } from '@/service/goods'

import { AddGoodWrapper } from './style'
import AddPageLayout from '@/layout/add-page'
import MSTextField from '@/components/ms-text-field'
import MSButton from '@/components/ms-button'
import MSSelect from '@/components/ms-select'
import MSCustomAlert from '@/components/ms-custom-alert'
import MSDialog from '@/components/ms-dialog'
import DisplayInfoBox from './c-cpns/display-price-box'
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
  // const [isShowDialog, setIsShowDialog] = useState(false);
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

  // const confirmBasePrice = () => {
  //   setIsShowDialog(false)
  //   setGoodsDetailInput({
  //     ...goodsDetailInput,
  //     basePrice: { ...goodsDetailInput.basePrice, isDisabled: true },
  //     officialPrice: { ...goodsDetailInput.officialPrice, isShow: true }
  //   })
  // }

  useEffect(() => {
    dispatch(requestSortsAction())
    dispatch(requestColorsAction())
  }, [dispatch])

  // const dialogFooter = () => {
  //   return (
  //     <>
  //       <MSButton
  //         variant="outlined"
  //         color="error"
  //         value="cancel"
  //         onClick={e => setIsShowDialog(false)}
  //       />
  //       <MSButton
  //         variant="outlined"
  //         color="success"
  //         value="confirm"
  //         onClick={confirmBasePrice}
  //       />
  //     </>
  //   )
  // }

  return (
    <AddGoodWrapper>
      <AddPageLayout>
        <div slot="header">header</div>
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
          {/* <MSTextField
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
              style={{ marginLeft: '20px' }}
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
          /> */}
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
      {/* <MSDialog
        isShowDialog={isShowDialog}
        content="確認成本價為xxx，確定後即不得再更改。"
        footer={dialogFooter()}
      /> */}
    </AddGoodWrapper>
  )
})

export default AddGood
