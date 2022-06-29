import React, { memo, useState } from 'react'

import { AddSortWrapper } from './style'
import MSinput from '@/components/ms-input'
import MSInputLabel from '@/components/ms-label'

export default memo(function AddSort() {
  const [sortVal, setSortVal] = useState('');
  return (
    <AddSortWrapper>
      <h2>Add Sort</h2>
      <h2>val: {sortVal}</h2>
      <MSinput value={sortVal} setvalue={setSortVal} id="sort-id" />
      <MSInputLabel id="sort-id">123</MSInputLabel>
    </AddSortWrapper>
  )
})
