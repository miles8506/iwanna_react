import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { ThemeProvider } from '@mui/material'
import { useCreateMUITheme } from '../../common/theme/mui-theme'
import { requestSortsAction } from '../../store/sorts/actionCreators'

import { SortsWrapper } from './style'
import MSButton from '../../components/ms-button'
import AddIcon from '@mui/icons-material/Add'
import MSTable from '@/components/ms-table'

export default memo(function Sorts(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { sorts = [] } = useSelector(
    (state) => ({
      sorts: state.getIn(['sorts', 'sortList'])
    }),
    shallowEqual
  )

  const headerCells = [
    {
      id: 'sort',
      numeric: false,
      label: '檔期'
    }
  ]

  useEffect(() => {
    // requestAddSort('sorts')
    dispatch(requestSortsAction())
  }, [dispatch])

  const theme = useCreateMUITheme()

  const goAddSortPage = () => {
    history.push('/sorts/add')
  }

  return (
    <SortsWrapper>
      <ThemeProvider theme={theme}>
        <div className="header">
          <MSButton
            value="新增分類"
            startIcon={<AddIcon />}
            onClick={goAddSortPage}
          />
        </div>
        <div className="body">
          <MSTable rows={sorts} headerCells={headerCells} />
        </div>
      </ThemeProvider>
    </SortsWrapper>
  )
})
