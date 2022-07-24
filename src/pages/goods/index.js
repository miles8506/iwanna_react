import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { headerCells } from './config'
import { useCreateMUITheme } from '@/common/theme/mui-theme.js'
import { requestGoodListAction } from '@/store/goods'
import { requestSortsAction } from '@/store/sorts'
import { requestDelGood } from '@/service/goods'

import { ThemeProvider } from '@mui/material'
import { GoodsWrapper } from './style'
import MSTable from '@/components/ms-table'
import MSButton from '@/components/ms-button'
import MSSelect from '@/components/ms-select'

export default memo(function Goods(props) {
  const { history } = props

  const dispatch = useDispatch()
  const { goodsList, sortsList } = useSelector(state => ({
    goodsList: state.getIn(['goods', 'goodsList']),
    sortsList: state.getIn(['sorts', 'sortList'])
  }), shallowEqual)

  const [filterValue, setFilterValue] = useState('All')

  const theme = useCreateMUITheme()

  const handleEdit = (id) => {
    console.log(id);
  }
  const controlButton = (id) => <MSButton value="編輯" onClick={e => handleEdit(id)} />

  const goAddGoodPage = () => {
    history.push('/goods/add')
  }

  const handleDeleteRow = async (delGoods, closeDialog) => {
    for (const factoryNum of delGoods) {
      await requestDelGood('goods', factoryNum)
    }
    dispatch(requestGoodListAction(controlButton))
    closeDialog()
  }

  useEffect(() => {
    dispatch(requestGoodListAction(controlButton))
    dispatch(requestSortsAction())
  }, [dispatch])

  return (
    <GoodsWrapper>
      <ThemeProvider theme={theme}>
        <div className="function-bar">
          <div className="filter">
            <MSSelect
              value={filterValue}
              setValue={setFilterValue}
              options={sortsList}
              isShowAllValue={true}
              label={'檔期種類'}
              renderKey="sort"
            />
            <MSButton value="Search" className="search-btn"></MSButton>
          </div>
          <MSButton
            value="新增商品"
            onClick={goAddGoodPage}
          />
        </div>
        <div className="goods-content">
          <MSTable
            title="Goods List"
            rows={goodsList}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
          />
        </div>
      </ThemeProvider>
    </GoodsWrapper>
  )
})
