import styled from 'styled-components'

const GoodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .function-bar {
    display: flex;
    justify-content: space-between;
  }

  .goods-content {
    flex: 1;
    background-color: #fff;
  }
`

export { GoodsWrapper }
