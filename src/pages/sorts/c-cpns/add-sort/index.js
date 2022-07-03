import React, { memo, useState } from 'react'

import { ALERT_DURATION } from '@/common/constants'
import { alertEnums } from '@/enums'

import { AddSortWrapper } from './style'
import MSLabelInput from '@/components/ms-label-input'
import MSButton from '@/components/ms-button'
import MSCustomAlert from '@/components/ms-custom-alert'
import { requestAddSort } from '@/service/sorts'

export default memo(function AddSort(props) {
  const { history } = props

  const [sortVal, setSortVal] = useState('')
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState({
    status: 'warning',
    message: ''
  })

  async function confirmClick() {
    if (sortVal.trim() === '') {
      setAlertStatus({ status: alertEnums.warning, message: '檔期名稱不得為空' })
      setIsShowAlert(true)
      return
    }
    try {
      await requestAddSort('sorts', sortVal, { sort: sortVal })
      history.push('/sorts')
    } catch (err) {
      setAlertStatus({ status: alertEnums.error, message: `連線異常, console:${err}` })
      setIsShowAlert(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setAlertStatus({ status: 'warning', message: '' })
    setIsShowAlert(false)
  }

  return (
    <AddSortWrapper>
      <h2 className="header">增加檔期</h2>
      <div className="body">
        <MSLabelInput
          value={sortVal}
          setvalue={setSortVal}
          id="sort-id"
          name={<h4>檔期名稱:</h4>}
        />
      </div>
      <div className="footer">
        <MSButton
          style={{ marginRight: '10px' }}
          variant="outlined"
          color="error"
          value="cancel"
          onClick={e => history.push('/sorts')}
        />
        <MSButton
          variant="outlined"
          color="success"
          value="confirm"
          onClick={confirmClick}
        />
      </div>
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
    </AddSortWrapper>
  )
})
