import React, { memo } from 'react'

import { FunctionBarWrapper } from './style'
import MSButton from '@/components/ms-button'

const FunctionBar = memo((props) => {
  const { history } = props

  return (
    <FunctionBarWrapper>
      <MSButton
        value="新建訂單"
        onClick={e => history.push('/orders/add')}
      />
    </FunctionBarWrapper>
  )
})

export default FunctionBar
