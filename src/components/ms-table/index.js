import React, { useCallback } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import EnhancedTableHead from './c-cpns/header'
import MSToolbar from './c-cpns/toolbar'
import MSBody from './c-cpns/body'
import { MSTableWrapper } from './style'

export default function EnhancedTable(props) {
  const { rows = [], headerCells = [], handleDeleteRow } = props
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)

  const rowsPerPage = 20
  // const [rowsPerPage, setRowsPerPage] = React.useState(20)

  const handleSelectAllClick = useCallback(() => {
    if (selected.length === 0) {
      const newSelecteds = rows
        .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
        .map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }, [rows, page, selected])

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
    setSelected([])
  }, [setPage, setSelected])

  // const handleChangeRowsPerPage = useCallback((event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   setPage(0)
  //   setSelected([])
  // }, [setRowsPerPage, setPage, setSelected])

  return (
    <MSTableWrapper>
      <MSToolbar
        numSelected={selected.length}
        selected={selected}
        handleDeleteRow={handleDeleteRow}
        setSelected={setSelected}
      />
      <TableContainer>
        <Table sx={{ minWidth: 200 }}>
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            headerCells={headerCells}
          />
          <MSBody
            payload={{
              rows,
              headerCells,
              page,
              rowsPerPage,
              selected,
              setSelected
            }}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MSTableWrapper>
  )
}
