import React, { memo, useState, useEffect } from 'react'

import { AddPageLayoutWrapper } from './style'

const AddPageLayout = memo((props) => {
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
    <AddPageLayoutWrapper>
      {slots.header}
      {slots.body}
      {slots.footer}
    </AddPageLayoutWrapper>
  )
})

export default AddPageLayout
