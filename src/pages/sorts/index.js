import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { ThemeProvider } from '@mui/material'
import { useCreateMUITheme } from '../../common/theme/mui-theme'
import { requestSortsAction } from '../../store/sorts/actionCreators'
import { requestDelSort } from '@/service/sorts'
import { headerCells } from './config'

import { SortsWrapper } from './style'
import MSButton from '../../components/ms-button'
import AddIcon from '@mui/icons-material/Add'
import MSTable from '@/components/ms-table'
import MSDialog from '@/components/ms-dialog'

export default memo(function Sorts(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { sorts = [] } = useSelector(
    (state) => ({
      sorts: state.getIn(['sorts', 'sortList'])
    }),
    shallowEqual
  )

  const [isShowDialog, setIsShowDialog] = useState(true);

  useEffect(() => {
    dispatch(requestSortsAction())
  }, [dispatch])

  const goAddSortPage = () => {
    history.push('/sorts/add')
  }

  const handleDeleteRow = async (delSorts, setSelected) => {
    for (const sort of delSorts) {
      await requestDelSort('sorts', sort)
    }
    dispatch(requestSortsAction())
  }

  const theme = useCreateMUITheme()

  const footer = (
    <div>
      <MSButton
        value="取消"
        color="error"
        style={{ marginRight: '10px' }}
        variant="text" />
      <MSButton value="確定" color="info" variant="text" />
    </div>
  )

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
          <MSTable rows={sorts} headerCells={headerCells} handleDeleteRow={handleDeleteRow} />
        </div>
      </ThemeProvider>
      <MSDialog
        isShowDialog={isShowDialog}
        title="is title"
        content="是否確定要刪除？"
        footer={footer}
        fullWidth={true}
      ></MSDialog>
    </SortsWrapper>
  )
})
