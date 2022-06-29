import React from 'react';

import { Input } from '@mui/material'
import { MSInputWrapper } from './style'

export default function MSInput(props) {
  const { value, setvalue: setValue, id } = props
  const changeVal = (e) => {
    setValue(e.target.value)
  }

  return (
    <MSInputWrapper>
      <Input value={value} onChange={changeVal} id={id} />
    </MSInputWrapper>
  );
}

