import { styled as MUIstyled } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableBody = MUIstyled(TableBody)(({ theme }) => ({}))

const StyledTableCell = MUIstyled(TableCell)((row) => {
  return {
    [`&.${tableCellClasses.root}`]: {
      padding: '10px'
    }
  }
})

export { StyledTableBody, StyledTableCell }
