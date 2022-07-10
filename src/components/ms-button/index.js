import React, { memo } from 'react'

import { StyledButton } from './style'

const MSButton = memo(function (props) {
  return (
    <StyledButton
      variant="contained"
      {...props}
      disableRipple={true}
      size="small"
    >
      {props.value}
    </StyledButton>
  )
})

export default MSButton
