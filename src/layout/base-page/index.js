import React, { memo, useState, useEffect } from 'react'

import { BasePageLayoutWrapper } from './style'

const BaseLayout = memo((props) => {
  const { children } = props
  const [slots, setSlots] = useState({
    header: null,
    body: null,
    footer: null
  });

  const updatedState = {}

  useEffect(() => {
    for (const child of children) {
      updatedState[child.props.slot] = child
    }
    setSlots({ ...slots, ...updatedState })
  }, [children])
  return (
    <BasePageLayoutWrapper>
      {slots.header}
      {slots.body}
      {slots.footer}
    </BasePageLayoutWrapper>
  )
})

export default BaseLayout
