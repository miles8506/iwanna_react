import React from 'react'

import { StyledLabel } from './style'

export default function MSLabel(props) {
  const { id, name } = props
  return <StyledLabel htmlFor={id}>{name}</StyledLabel>
}
