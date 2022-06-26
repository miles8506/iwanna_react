import React, { memo } from 'react'

import TableBody from '@mui/material/TableBody';
import { StyledTableCell, StyledTableRow } from '../../style'

export default memo(function MSTableBody(props) {
  const { rows = [], mappingKeys = [] } = props

  return (
    <TableBody>
      {rows.map((row) => (
        <StyledTableRow key={row.name}>
          {
            mappingKeys.map(item => (
              <StyledTableCell
                align="left"
                key={row[item.key]}
                sx={{ width: item.width }}
              >
                {row[item.key]}
              </StyledTableCell>
            ))
          }
        </StyledTableRow>
      ))}
    </TableBody>
  )
})
