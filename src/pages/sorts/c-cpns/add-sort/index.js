import React, { memo, useState } from 'react'

import { AddSortWrapper } from './style'
import MSLabelInput from '@/components/ms-label-input'
import MSButton from '@/components/ms-button'
import MSSnackbar from '@/components/ms-snackbar'
import { Alert } from '@mui/material'

export default memo(function AddSort(props) {
  const { history } = props

  const [sortVal, setSortVal] = useState('')
  const [isShowAlert, setIsShowAlert] = useState(false)

  function confirmClick() {
    if (sortVal.trim() === '') {
      setIsShowAlert(true)
      return
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setIsShowAlert(false)
  };

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
      <MSSnackbar
        open={isShowAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert severity='warning' sx={{ width: '100%' }}>
          檔期名稱不得為空
        </Alert>
      </MSSnackbar>
    </AddSortWrapper>
  )
})
