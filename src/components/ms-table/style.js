import styled from 'styled-components'
import { styled as MUIstyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const MSTableWrapper = styled.div`
`

const StyledTableCell = MUIstyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: '#b78873',
    backgroundColor: '#909090',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.root}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = MUIstyled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export { MSTableWrapper, StyledTableCell, StyledTableRow }