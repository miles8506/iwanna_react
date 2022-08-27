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
  const [goodsListState, setGoodsListState] = useState([]);

  const theme = useCreateMUITheme()

  const controlButton = (factoryNum) => <MSButton value="編輯" onClick={e => history.push(`goods/${factoryNum}`)} />

  const handleDeleteRow = async (delGoods, closeDialog) => {
    for (const factoryNum of delGoods) {
      await requestDelGood('goods', factoryNum)
    }
    dispatch(requestGoodListAction(controlButton))
    closeDialog()
  }

  const onFilterGoodsList = () => {
    if (filterValue === 'All') {
      setGoodsListState([...goodsList])
      return
    }
    setGoodsListState([...goodsList.filter(item => item.sort === filterValue)])
  }

  useEffect(() => {
    dispatch(requestGoodListAction(controlButton))
    dispatch(requestSortsAction())
  }, [dispatch])

  useEffect(() => {
    setGoodsListState([...goodsList])
  }, [goodsList])

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
            <MSButton
              value="Search"
              className="search-btn"
              onClick={onFilterGoodsList}
            />
          </div>
          <MSButton
            value="新增商品"
            onClick={e => history.push('/goods/add')}
          />
        </div>
        <div className="goods-content">
          <MSTable
            title="Goods List"
            rows={goodsListState}
            headerCells={headerCells}
            handleDeleteRow={handleDeleteRow}
            alertContent="確定要刪除該商品？"
          />
        </div>
      </ThemeProvider>
    </GoodsWrapper>
  )
})
