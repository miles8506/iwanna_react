import React, { memo } from 'react'

import { StyledCheckbox } from './style'

const MSCheckbox = memo((props) => {
  return (
    <StyledCheckbox
      {...props}
      // color="primary"
      // onClick={(event) => handleClick(event, row.id)}
      // checked={isItemSelected}
      // inputProps={{
      //   'aria-labelledby': labelId,
      // }}
    />
  )
})

export default MSCheckbox
