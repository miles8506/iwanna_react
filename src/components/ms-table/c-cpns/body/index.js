import React, { memo } from 'react'

import { StyledTableBody } from './style'
import { StyledTableRow } from '../../style'
import TableCell from '@mui/material/TableCell'
import MSCheckbox from '../../../ms-checkbox'

const MSBody = memo((props) => {
  const { rows, headerCells, page, rowsPerPage, selected, setSelected } =
    props.payload
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  return (
    <StyledTableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id)
          const labelId = `enhanced-table-checkbox-${index}`

          return (
            <StyledTableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <MSCheckbox
                  color="brown"
                  onClick={(event) => handleClick(event, row.id)}
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </TableCell>
              {headerCells.map((item) => {
                return (
                  <TableCell
                    align="left"
                    key={item.id}
                    sx={{ width: item.width }}
                  >
                    {row[item.id]}
                  </TableCell>
                )
              })}
            </StyledTableRow>
          )
        })}
    </StyledTableBody>
  )
})

export default MSBody
