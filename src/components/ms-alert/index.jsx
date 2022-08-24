import React from 'react'

import { StyledAlert } from './style'

export default function MSAlert(props) {
  const { children: content, ...elseProps } = props
  return <StyledAlert {...elseProps}>{content ?? null}</StyledAlert>
}
