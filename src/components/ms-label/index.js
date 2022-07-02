import React, { memo } from 'react'

import { StyledLabel } from './style'

export default memo(function MSLabel(props) {
  const { id, name } = props
  return <StyledLabel htmlFor={id}>{name}</StyledLabel>
})
