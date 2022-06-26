import React, { memo } from 'react'

import { MSButtonWrapper } from './style'
import { Button } from '@mui/material';

export default memo(function MSButton(props) {
  return (
    <MSButtonWrapper>
      <Button
        variant="contained"
        disableRipple={true}
        size="small"
        {...props}
      >
        {props.value}
      </Button>
    </MSButtonWrapper>
  )
})