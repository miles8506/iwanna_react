import React, { memo } from 'react';

import { StyledInputLabel } from './style'

export default memo(function MSInputLabel(props) {
  const { children, id } = props
  return (
    <StyledInputLabel htmlFor={id}>
      {children}
    </StyledInputLabel>
  );
})
