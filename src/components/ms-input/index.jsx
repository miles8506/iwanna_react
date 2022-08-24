import React from 'react'

import { StyledInput } from './style'

export default function MSInput(props) {
  const { value, setvalue: setValue, id } = props
  const changeVal = (e) => {
    setValue(e.target.value)
  }

  return <StyledInput value={value} onChange={changeVal} id={id} />
}
