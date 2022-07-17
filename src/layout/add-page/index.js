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
      <div className="header">{slots.header}</div>
      <div className="body">{slots.body}</div>
      <div className="footer">{slots.footer}</div>
    </AddPageLayoutWrapper>
  )
})

export default AddPageLayout
