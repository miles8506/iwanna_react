import React from 'react'

import { StyledSnackbar } from './style'

export default function MSSnackbar(props) {
  const { children: content, ...elseProps } = props

  return <StyledSnackbar {...elseProps}>{content ?? null}</StyledSnackbar>
}
