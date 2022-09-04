import styled from 'styled-components'
import { styled as MUIstyled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const MSTableWrapper = styled.div`
  position: relative;
  height: calc(100% - 52px);

  .MuiTablePagination-root {
    position: fixed;
    bottom: ${(props) => props.customStyle.styleBottom ? props.customStyle.styleBottom : '15px'};
    left: ${(props) => props.customStyle.styleLeft ? props.customStyle.styleLeft : '0px'};
    right: ${(props) => props.customStyle.styleRight ? props.customStyle.styleRight : '0px'};
  }

  .MuiTableBody-root {
    tr[aria-checked=true] {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`

const StyledTableCell = MUIstyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#d7d0c5',
    color: theme.palette.common.white,
    padding: '10px'
  },
  [`&.${tableCellClasses.root}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = MUIstyled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export { MSTableWrapper, StyledTableCell, StyledTableRow }
