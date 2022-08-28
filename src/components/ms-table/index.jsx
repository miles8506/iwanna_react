import React, { useCallback } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import EnhancedTableHead from './c-cpns/header'
import MSToolbar from './c-cpns/toolbar'
import MSBody from './c-cpns/body'
import { MSTableWrapper } from './style'

export default function EnhancedTable(props) {
  const {
    rows = [],
    headerCells = [],
    handleWarningAlert,
    title = '',
    handleDeleteRow,
    alertContent,
    page,
    setPage
  } = props

  const [selected, setSelected] = React.useState([])

  const rowsPerPage = 20

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

  return (
    <MSTableWrapper>
      <MSToolbar
        numSelected={selected.length}
        selected={selected}
        setSelected={setSelected}
        handleWarningAlert={handleWarningAlert}
        title={title}
        handleDeleteRow={handleDeleteRow}
        alertContent={alertContent}
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
      />
    </MSTableWrapper>
  )
}
