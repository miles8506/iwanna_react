import React, { memo } from 'react'

import { StyledInput } from './style'

export default memo(function MSInput(props) {
  const { value, setvalue: setValue, id } = props
  const changeVal = (e) => {
    setValue(e.target.value)
  }

  return <StyledInput value={value} onChange={changeVal} id={id} />
})
