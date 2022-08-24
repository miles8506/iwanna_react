import React from 'react'

import { StyledButton } from './style'

const MSButton = function (props) {
  return (
    <StyledButton
      variant="contained"
      disableRipple={true}
      size="small"
      {...props}
    >
      {props.value}
    </StyledButton>
  )
}

export default MSButton
