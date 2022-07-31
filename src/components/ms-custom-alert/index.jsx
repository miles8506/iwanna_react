import React, { memo } from 'react'

import MSSnackbar from '@/components/ms-snackbar'
import { Alert } from '@mui/material'

export default memo(function MSCustomAlert(props) {
  const { severity, sx, children: content, ...snackbarProps } = props

  return (
    <MSSnackbar {...snackbarProps}>
      <Alert severity={severity} sx={sx}>
        {content ?? null}
      </Alert>
    </MSSnackbar>
  )
})
