import React from 'react'

import { CustomInputWrapper } from './style'

const CustomInput = (props) => {
  const { change, ...elseProps } = props

  const handleChange = (e) => {
    change(e.target.value)
  }

  return (
    <CustomInputWrapper>
      <input type="text" {...elseProps} onChange={e => handleChange(e)} />
    </CustomInputWrapper>
  )
}

export default CustomInput
