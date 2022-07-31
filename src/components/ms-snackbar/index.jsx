import React, { memo } from 'react'

import { StyledSnackbar } from './style'

export default memo(function MSSnackbar(props) {
  const { children: content, ...elseProps } = props

  return <StyledSnackbar {...elseProps}>{content ?? null}</StyledSnackbar>
})
