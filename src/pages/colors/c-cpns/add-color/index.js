import React, { memo, useState } from 'react'

import { ALERT_DURATION } from '@/common/constants'
import { alertEnums } from '@/enums'
import { requestAddColor, requestGetColors } from '@/service/colors'

import BaseLayout from '@/layout/base-page'
import { AddColorWrapper } from './style'
import MSLabelInput from '@/components/ms-label-input'
import MSButton from '@/components/ms-button'
import MSCustomAlert from '@/components/ms-custom-alert'

const addColor = memo((props) => {
  const { history } = props

  const [colorVal, setColorVal] = useState('');
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState({
    status: alertEnums.warning,
    message: ''
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setAlertStatus({ status: alertEnums.warning, message: '' })
    setIsShowAlert(false)
  }

  const confirmClick = async () => {
    if (colorVal.trim() === '') {
      setAlertStatus({ status: alertEnums.warning, message: '顏色名稱不得為空' })
      setIsShowAlert(true)
      return
    }
    try {
      const allColor = await requestGetColors('colors')
      const isSomeColorVal = allColor.docs.some(item => item.data().color === colorVal)
      if (isSomeColorVal) {
        setAlertStatus({ status: alertEnums.warning, message: `已有<${colorVal}>顏色名稱，請重新輸入其他顏色名稱` })
        setIsShowAlert(true)
        return
      }
      await requestAddColor('colors', colorVal, { color: colorVal })
      history.push('/colors')
    } catch (err) {
      setAlertStatus({ status: alertEnums.error, message: `連線異常, console:${err}` })
      setIsShowAlert(true)
    }
  }

  return (
    <AddColorWrapper>
      <BaseLayout>
        <h2 slot='header'>增加顏色</h2>
        <div slot="body">
          <MSLabelInput
            value={colorVal}
            setvalue={setColorVal}
            id="sort-id"
            name={<h4>顏色名稱:</h4>}
          />
        </div>
        <div slot="footer">
          <MSButton
            style={{ marginRight: '10px' }}
            variant="outlined"
            color="error"
            value="cancel"
            onClick={e => history.push('/colors')}
          />
          <MSButton
            variant="outlined"
            color="success"
            value="confirm"
            onClick={confirmClick}
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
    </AddColorWrapper>
  )
})

export default addColor
