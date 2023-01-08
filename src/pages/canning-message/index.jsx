import React, { memo, useState, useEffect } from 'react'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useCreateMUITheme } from '../../common/theme/mui-theme'
import { requestCanningMessage } from '@/store/canning-message'
import { headerCells } from './config'
import { requestDelCanningMessage } from '@/service/canning-message'

import { CanningMessageWrapper } from './style'
import MSTable from '@/components/ms-table'
import { ThemeProvider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MSButton from '../../components/ms-button'

const CanningMessage = memo((props) => {
  const dispatch = useDispatch()
  const { canningMessageList } = useSelector(
    (state) => ({
      canningMessageList: state.getIn(['canningMessage', 'canningMessageList'])
    }),
    shallowEqual
  )
  const { history } = props

  const [page, setPage] = useState(0)
  const theme = useCreateMUITheme()


  const handleDeleteRow = async (delMessages, closeDialog) => {
    for (const message of delMessages) {
      await requestDelCanningMessage('cans', message)
    }
    dispatch(requestCanningMessage())
    closeDialog()
  }

  useEffect(() => {
    dispatch(requestCanningMessage())
  }, [dispatch])

  return (
    <CanningMessageWrapper>
      <div className="header">
        <MSButton
          value="新增罐頭訊息"
          startIcon={<AddIcon />}
          onClick={e => history.push('/canning-message/add')}
        />
      </div>
      <div className="content">
        <ThemeProvider theme={theme}>
          <MSTable
            title="Canning Message List"
            rows={canningMessageList}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
            alertContent="確定要刪除該訊息？"
            page={page}
            setPage={setPage}
          />
        </ThemeProvider>
      </div>
    </CanningMessageWrapper>
  )
})

export default CanningMessage
