import React, { memo } from 'react'

import { StyledTableBody, StyledTableCell } from './style'
import { StyledTableRow } from '../../style'
import MSCheckbox from '../../../ms-checkbox'

const MSBody = memo((props) => {
  const { rows, headerCells, page, rowsPerPage, selected, setSelected, remindStatus } =
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
              aria-checked={row.id === remindStatus}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <StyledTableCell padding="checkbox">
                <MSCheckbox
                  color="brown"
                  onClick={(event) => handleClick(event, row.id)}
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </StyledTableCell>
              {headerCells.map((item) => {
                return (
                  <StyledTableCell
                    align="left"
                    key={item.id}
                    sx={{ width: item.width, minWidth: item.minWidth }}
                    past-due={row.pastDueAlert}
                  >
                    <div style={
                      {
                        width: item.width,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }
                    }>{row[item.id]}</div>
                  </StyledTableCell>
                )
              })}
            </StyledTableRow>
          )
        })}
    </StyledTableBody>
  )
})

export default MSBody
