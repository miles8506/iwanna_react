import React, { memo, useState } from 'react'

import { ALERT_DURATION } from '@/common/constants'
import { requestAddSort, requestGetSorts } from '@/service/sorts'
import { alertEnums } from '@/enums'

import AddPageLayout from '@/layout/add-page'
import { AddSortWrapper } from './style'
import MSLabelInput from '@/components/ms-label-input'
import MSButton from '@/components/ms-button'
import MSCustomAlert from '@/components/ms-custom-alert'

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
      setAlertStatus({ ...alertStatus, message: '檔期名稱不得為空' })
      setIsShowAlert(true)
      return
    }
    try {
      const allSort = await requestGetSorts('sorts')
      const isSomeSortVal = allSort.docs.some(item => item.data().sort === sortVal)
      if (isSomeSortVal) {
        setAlertStatus({ status: alertEnums.warning, message: `已有<${sortVal}>種類名稱，請重新輸入其他種類名稱` })
        setIsShowAlert(true)
        return
      }
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
      <AddPageLayout>
        <h2 slot="header">增加檔期</h2>
        <div slot="body">
          <MSLabelInput
            value={sortVal}
            setvalue={setSortVal}
            id="sort-id"
            name={<h4>檔期名稱:</h4>}
          />
        </div>
        <div slot="footer">
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
    </AddSortWrapper>
  )
})
