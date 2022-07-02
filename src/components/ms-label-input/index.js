import React, { memo } from 'react'

import { MSLabelInputWrapper } from './style'
import MSInput from '../ms-input'
import MSLabel from '../ms-label'

export default memo(function (props) {
  const { value, setvalue, id, name } = props

  return (
    <MSLabelInputWrapper>
      <MSLabel id={id} name={name} />
      <MSInput value={value} setvalue={setvalue} id={id} />
    </MSLabelInputWrapper>
  )
})
