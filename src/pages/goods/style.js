import styled from 'styled-components'

const GoodsWrapper = styled.div`
  height: 100%;

  .function-bar {
    display: flex;
    justify-content: space-between;

    .filter {
      display: flex;

      .MuiOutlinedInput-notchedOutline {
        border-color: #b78873;
      }

      .Mui-focused {
        color: #b78873;
      }

      .MuiInputLabel-root,
      .MuiSelect-select {
        color: #545454;
      }

      .search-btn {
        margin-left: 10px;
      }
    }
  }

  .goods-content {
    height: calc(100% - 48px);
    overflow-y: auto;
    background-color: #fff;
  }
`

export { GoodsWrapper }
