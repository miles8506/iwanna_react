import { styled as MUIstyled } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableBody = MUIstyled(TableBody)(({ theme }) => ({}))

const StyledTableCell = MUIstyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    color: '#545454',
    padding: '10px'
  }
}))

export { StyledTableBody, StyledTableCell }
