import styled from 'styled-components'

const GoodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .function-bar {
    display: flex;
    justify-content: space-between;

    .filter {
      display: flex;

      .search-btn {
        margin-left: 10px;
      }
    }
  }

  .goods-content {
    flex: 1;
    background-color: #fff;
  }
`

export { GoodsWrapper }
