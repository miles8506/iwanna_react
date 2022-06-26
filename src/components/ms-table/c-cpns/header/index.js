import React, { memo } from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { StyledTableCell } from '../../style'

export default memo(function MSTableHeader(props) {
  const { mappingKeys = [] } = props
  console.log(mappingKeys)
  return (
    <TableHead>
      <TableRow>
        {
          mappingKeys.map((item) => (
            <StyledTableCell
              align="left"
              key={item.key}
            >
              {item.name}
            </StyledTableCell>)
          )
        }
      </TableRow>
    </TableHead>
  )
})
