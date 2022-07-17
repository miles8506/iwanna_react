import React, { memo } from 'react'

import { StyledInput } from './style'

const MSTextField = memo((props) => {
  const { setValue, detail = [], status, iid, ...elseProps } = props

  const changeDetail = (e, iid) => {
    let key = null
    for (const k in detail) {
      if (detail[k].iid === iid) {
        key = k
        break
      }
    }
    const target = detail[key]
    setValue({ ...detail, [key]: { ...target, value: e.target.value } })
  }

  return (
    <StyledInput
      {...elseProps}
      required={status ? true : false}
      error={!status ? true : false}
      onChange={e => changeDetail(e, iid)}
      value={detail.value}
    />
  )
})

export default MSTextField
