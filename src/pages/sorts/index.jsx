import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { useCreateMUITheme } from '../../common/theme/mui-theme'
import { requestSortsAction } from '../../store/sorts/actionCreators'
import { headerCells } from './config'

import { ThemeProvider } from '@mui/material'
import { SortsWrapper } from './style'
import MSButton from '../../components/ms-button'
import AddIcon from '@mui/icons-material/Add'
import MSTable from '@/components/ms-table'

import { requestDelSort } from '@/service/sorts'

export default memo(function Sorts(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { sorts = [] } = useSelector(
    (state) => ({
      sorts: state.getIn(['sorts', 'sortList'])
    }),
    shallowEqual
  )

  const theme = useCreateMUITheme()

  useEffect(() => {
    dispatch(requestSortsAction())
  }, [dispatch])

  const handleDeleteRow = async (delSorts, closeDialog) => {
    for (const sort of delSorts) {
      await requestDelSort('sorts', sort)
    }
    dispatch(requestSortsAction())
    closeDialog()
  }

  return (
    <SortsWrapper>
      <ThemeProvider theme={theme}>
        <div className="header">
          <MSButton
            value="新增分類"
            startIcon={<AddIcon />}
            onClick={e => history.push('/sorts/add')}
          />
        </div>
        <div className="body">
          <MSTable
            title="Sort List"
            rows={sorts}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
          />
        </div>
      </ThemeProvider>
    </SortsWrapper>
  )
})
