import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { requestColorsAction } from '@/store/colors'
import { useCreateMUITheme } from '../../common/theme/mui-theme'
import { headerCells } from './config'
import { requestDelColor } from '@/service/colors'

import { ColorsWrapper } from './style'
import { ThemeProvider } from '@mui/material'
import MSTable from '@/components/ms-table'
import AddIcon from '@mui/icons-material/Add'
import MSButton from '../../components/ms-button'

const Colors = (props) => {
  const { history } = props
  const dispatch = useDispatch()
  const { colorList } = useSelector(state => ({
    colorList: state.getIn(['colors', 'colorList'])
  }), shallowEqual)

  const [page, setPage] = useState(0)

  const theme = useCreateMUITheme()

  useEffect(() => {
    dispatch(requestColorsAction())
  }, [dispatch])

  const handleDeleteRow = async (delColors, closeDialog) => {
    for (const color of delColors) {
      await requestDelColor('colors', color)
    }
    dispatch(requestColorsAction())
    closeDialog()
  }

  return (
    <ColorsWrapper>
      <ThemeProvider theme={theme}>
        <div className="header">
          <MSButton
            value="新增分類"
            startIcon={<AddIcon />}
            onClick={e => history.push('/colors/add')}
          />
        </div>
        <div className="content">
          <MSTable
            title="Color List"
            rows={colorList}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
            alertContent="確定要刪除該顏色？"
            page={page}
            setPage={setPage}
          />
        </div>
      </ThemeProvider>
    </ColorsWrapper>
  )
}

export default Colors
