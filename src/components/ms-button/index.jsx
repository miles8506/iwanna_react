import React, { memo } from 'react'

import { StyledButton } from './style'

const MSButton = memo(function (props) {
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
})

export default MSButton
