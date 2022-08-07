import React, { memo } from 'react'

import { MSTextFieldWrapper, StyledInput } from './style'

const MSTextField = memo((props) => {
  const { setValue, detail = [], status, iid, children, required = true, ...elseProps } = props

  const findKey = (detail) => {
    for (const key in detail) {
      if (detail[key].iid === iid) {
        return key
      }
    }
  }
  const changeDetail = (e, iid) => {
    const key = findKey(detail)
    const target = detail[key]
    setValue({ ...detail, [key]: { ...target, value: e.target.value } })
  }
  return (
    <MSTextFieldWrapper>
      <StyledInput
        {...elseProps}
        required={required}
        error={!status ? true : false}
        onChange={e => changeDetail(e, iid)}
        value={detail[findKey(detail)]?.value}
        variant="standard"
        id="standard-required"
        autoComplete="off"
      />
      {children}
    </MSTextFieldWrapper>
  )
})

export default MSTextField
