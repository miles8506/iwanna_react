import React, { memo } from 'react'

import { SortsWrapper } from './style'
import MSButton from '../../components/ms-button'
import AddIcon from '@mui/icons-material/Add'
import MSTable from '@/components/ms-table'

export default memo(function Sorts() {
  function handleTableData() {
    const CustomControl = <MSButton value="刪除" color="error"></MSButton>
    const tableMappingKeys = [{ key: 'name', name: '檔期種類', width: '90%' }, { key: 'control', name: '操作', width: '10%' }]
    function createData(name) {
      return { name, control: CustomControl }
    }
    const rows = [
      createData('0115')
    ]
    return {
      rows,
      keys: tableMappingKeys
    }
  }
  return (
    <SortsWrapper>
      <div className="header">
        <MSButton value="新增分類" startIcon={<AddIcon />} />
      </div>
      <div className="body">
        <MSTable rows={handleTableData().rows} mappingKeys={handleTableData().keys}>
        </MSTable>
      </div>
    </SortsWrapper>
  )
})
