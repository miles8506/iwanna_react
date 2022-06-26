import React, { memo } from 'react'

import { StyledButton } from './style'

export default memo(function MSButton(props) {
  return (
    <StyledButton variant="contained"
      disableRipple={true}
      size="small"
      {...props}
    >
      {props.value}
    </StyledButton>
  )
})