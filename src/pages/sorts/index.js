import React, { memo } from 'react'

import { SortsWrapper } from './style'
import MSButton from '../../components/ms-button'
import AddIcon from '@mui/icons-material/Add'
import MSTable from '@/components/ms-table'

export default memo(function Sorts() {
  function handleTableData() {
    const headerCells = [
      {
        id: 'sort',
        numeric: false,
        disablePadding: true,
        label: '檔期',
      }
    ]
    function createData(sort, id, test) {
      return { sort, id }
    }
    const rows = [
      createData('0115', '001'),
      createData('0123', '002'),
      createData('0111', '003'),
      createData('0132', '004'),
      createData('0143', '005'),
      createData('0153', '006'),
      createData('0117', '007'),
      createData('0174', '008'),
      createData('0177', '009'),
      createData('0192', '010'),
      createData('0113', '011'),
      createData('0163', '012'),
      createData('0112', '013'),
      createData('0168', '014'),
      createData('0188', '015'),
      createData('0162', '016'),
    ]
    return {
      rows,
      headerCells
    }
  }
  return (
    <SortsWrapper>
      <div className="header">
        <MSButton value="新增分類" startIcon={<AddIcon />} />
      </div>
      <div className="body">
        <MSTable rows={handleTableData().rows} headerCells={handleTableData().headerCells}>
        </MSTable>
      </div>
    </SortsWrapper>
  )
})
