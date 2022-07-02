import React, { memo } from 'react'

import { StyledAlert } from './style'

export default memo(function MSAlert(props) {
  const { children: content, ...elseProps } = props
  return <StyledAlert {...elseProps}>{content ?? null}</StyledAlert>
})
